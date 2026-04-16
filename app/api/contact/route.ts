import nodemailer from 'nodemailer'

const requiredEnvVars = [
  'SMTP_HOST',
  'SMTP_PORT',
  'SMTP_USER',
  'SMTP_PASS',
  'CONTACT_TO_EMAIL',
] as const

type ContactPayload = {
  name?: string
  email?: string
  message?: string
}

function getMissingEnvVars() {
  return requiredEnvVars.filter((key) => !process.env[key])
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function POST(request: Request) {
  const missingEnvVars = getMissingEnvVars()

  if (missingEnvVars.length > 0) {
    return Response.json(
      {
        error: `Missing email configuration: ${missingEnvVars.join(', ')}`,
      },
      { status: 500 }
    )
  }

  let payload: ContactPayload

  try {
    payload = await request.json()
  } catch {
    return Response.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const name = payload.name?.trim() || ''
  const email = payload.email?.trim() || ''
  const message = payload.message?.trim() || ''

  if (!name || !email || !message) {
    return Response.json({ error: 'Please fill in all fields.' }, { status: 400 })
  }

  if (!isValidEmail(email)) {
    return Response.json({ error: 'Please enter a valid email address.' }, { status: 400 })
  }

  const port = Number.parseInt(process.env.SMTP_PORT || '', 10)

  if (!Number.isInteger(port)) {
    return Response.json({ error: 'SMTP_PORT must be a valid number.' }, { status: 500 })
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  try {
    await transporter.sendMail({
      from: process.env.CONTACT_FROM_EMAIL || process.env.SMTP_USER,
      to: process.env.CONTACT_TO_EMAIL,
      replyTo: email,
      subject: `Portfolio contact from ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        '',
        'Message:',
        message,
      ].join('\n'),
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827;">
          <h2 style="margin-bottom: 16px;">New portfolio contact message</h2>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
        </div>
      `,
    })

    return Response.json({ ok: true })
  } catch (error) {
    console.error('Contact email send failed:', error)
    return Response.json(
      { error: 'Unable to send email right now. Please try again later.' },
      { status: 500 }
    )
  }
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}
