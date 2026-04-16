import { existsSync, rmSync } from "node:fs";
import { execFileSync, spawn } from "node:child_process";
import path from "node:path";
import process from "node:process";

const projectRoot = process.cwd();
const lockFile = path.join(projectRoot, ".next", "dev", "lock");

function stopExistingNextDev() {
  if (process.platform !== "win32") {
    return;
  }

  const query = [
    "Get-CimInstance Win32_Process",
    `-Filter "Name = 'node.exe'"`,
    `| Where-Object { $_.CommandLine -like '*${projectRoot}*start-server.js*' }`,
    "| Select-Object -ExpandProperty ProcessId",
  ].join(" ");

  let output = "";

  try {
    output = execFileSync("powershell.exe", ["-NoProfile", "-Command", query], {
      encoding: "utf8",
      windowsHide: true,
    });
  } catch {
    return;
  }

  const pids = output
    .split(/\r?\n/)
    .map((line) => Number.parseInt(line.trim(), 10))
    .filter((pid) => Number.isInteger(pid) && pid > 0 && pid !== process.pid);

  for (const pid of pids) {
    try {
      execFileSync("taskkill.exe", ["/PID", String(pid), "/F"], {
        stdio: "ignore",
        windowsHide: true,
      });
    } catch {
      // Ignore failures and let Next report any remaining conflict.
    }
  }

  if (pids.length > 0) {
    execFileSync("powershell.exe", ["-NoProfile", "-Command", "Start-Sleep -Milliseconds 500"], {
      stdio: "ignore",
      windowsHide: true,
    });
  }
}

async function main() {
  stopExistingNextDev();

  if (existsSync(lockFile)) {
    try {
      rmSync(lockFile, { force: true });
    } catch {
      // If the lock is still active, Next will recreate/report it.
    }
  }

  const nextBin = path.join(
    projectRoot,
    "node_modules",
    "next",
    "dist",
    "bin",
    "next"
  );

  const child = spawn(process.execPath, [nextBin, "dev"], {
    stdio: "inherit",
    cwd: projectRoot,
    env: process.env,
  });

  child.on("exit", (code, signal) => {
    if (signal) {
      process.kill(process.pid, signal);
      return;
    }

    process.exit(code ?? 0);
  });
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
