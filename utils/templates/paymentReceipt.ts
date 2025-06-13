interface TurnoItem {
  servicio: string;
  fecha: string; // en formato dd/mm/yyyy
  hora: string;  // HH:MM
}

export const buildPaymentReceipt = (
  cliente: string,
  amount: number,
  fecha: string,
  items: TurnoItem[]
): string => `
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <title>Comprobante de Pago – Spa Sentirse Bien</title>
  </head>
  <body style="font-family:Arial,Helvetica,sans-serif;background:#F5F9F8;margin:0;padding:0;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#F5F9F8;padding:24px 0;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background:#FFFFFF;border-radius:8px;overflow:hidden;box-shadow:0 2px 6px rgba(0,0,0,.05);">
            <tr>
              <td style="background:#436E6C;color:#ffffff;padding:16px 24px;">
                <h1 style="margin:0;font-size:20px;">Spa Sentirse Bien</h1>
                <p style="margin:0;font-size:12px;opacity:0.8;">Bienestar & Relax</p>
              </td>
            </tr>
            <tr>
              <td style="padding:32px 24px;">
                <h2 style="margin-top:0;color:#333333;font-size:18px;">Comprobante de Pago</h2>
                <p style="font-size:14px;color:#555;">Hola <strong>${cliente}</strong>, ¡gracias por tu pago!</p>

                <table width="100%" cellpadding="0" cellspacing="0" style="margin:24px 0;font-size:14px;color:#333;">
                  <tr>
                    <td style="padding:8px 0;">Monto abonado:</td>
                    <td style="padding:8px 0;text-align:right;font-size:20px;font-weight:bold;color:#436E6C;">$${amount.toLocaleString('es-AR')}</td>
                  </tr>
                  <tr style="border-top:1px solid #e5e5e5;">
                    <td style="padding:8px 0;">Fecha:</td>
                    <td style="padding:8px 0;text-align:right;">${fecha}</td>
                  </tr>
                </table>

                <h3 style="font-size:15px;margin:0 0 8px 0;color:#333;">Detalle de turnos</h3>
                <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-size:13px;color:#333;">
                  <thead>
                    <tr style="background:#B6D5C8;color:#436E6C;">
                      <th align="left" style="padding:6px 8px;font-weight:600;">Servicio</th>
                      <th align="center" style="padding:6px 8px;font-weight:600;">Fecha</th>
                      <th align="center" style="padding:6px 8px;font-weight:600;">Hora</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${items
                      .map(
                        (it) => `
                          <tr style="border-bottom:1px solid #e5e5e5;">
                            <td style="padding:6px 8px;">${it.servicio}</td>
                            <td align="center" style="padding:6px 8px;">${it.fecha}</td>
                            <td align="center" style="padding:6px 8px;">${it.hora}</td>
                          </tr>`
                      )
                      .join("")}
                  </tbody>
                </table>

                <p style="font-size:12px;color:#777;line-height:1.6;">Este es un comprobante automático generado por Spa Sentirse Bien. Por favor, no respondas a este correo.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`; 