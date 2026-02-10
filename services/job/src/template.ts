export const applicationStatusUpdateTemplate = (
  userName: string,
  jobTitle: string,
  dashboardUrl: string,
  status: "Submitted" | "Reviewed" | "Rejected" | "Hired" | "" = ""
) => {

  const statusColorMap: Record<string, string> = {
    Submitted: "#6c757d",
    Reviewed: "#17a2b8",
    Rejected: "#dc3545",
    Hired: "#28a745",
    "": "#667eea", // default
  };

  // ✅ Decide color before template
  const statusColor = statusColorMap[status] || "#667eea";

  return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>Application Status Update</title>
</head>

<body style="margin:0;padding:0;background-color:#f4f4f4;font-family:Arial,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" role="presentation">
<tr>
<td align="center" style="padding:40px 0;">

<table width="600" cellpadding="0" cellspacing="0" role="presentation"
style="background:#ffffff;border-radius:8px;overflow:hidden;
box-shadow:0 4px 6px rgba(0,0,0,0.1);">

<!-- Header -->
<tr>
<td align="center"
style="background:linear-gradient(135deg,#667eea,#764ba2);
padding:40px 30px;color:#ffffff;">

<h1 style="margin:0;font-size:28px;">Application Status Update</h1>

</td>
</tr>

<!-- Content -->
<tr>
<td style="padding:40px 30px;color:#333333;">

<p style="font-size:16px;margin:0 0 15px;">
Hi <strong>${userName}</strong>,
</p>

<p style="font-size:16px;margin:0 0 15px;">
Your application for
<strong>${jobTitle}</strong>
has been updated.
</p>

<p style="font-size:16px;margin:0 0 20px;">
Current Status:
<strong style="color:${statusColor};">
${status || "Updated"}
</strong>
</p>

<!-- Button -->
<div style="text-align:center;margin:30px 0;">

<a href="${dashboardUrl}"
style="
background:#667eea;
color:#ffffff;
text-decoration:none;
padding:12px 25px;
border-radius:5px;
font-size:15px;
display:inline-block;
">
View Application
</a>

</div>

<p style="font-size:14px;color:#666666;">
Thank you for applying with HireHeaven.
We appreciate your interest.
</p>

</td>
</tr>

<!-- Footer -->
<tr>
<td align="center"
style="background:#f8f9fa;padding:25px;border-top:1px solid #e9ecef;">

<p style="margin:0 0 8px;font-size:12px;color:#999;">
© ${new Date().getFullYear()} HireHeaven. All rights reserved.
</p>

<p style="margin:0;font-size:12px;color:#999;">
This is an automated message. Please do not reply.
</p>

</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
</html>
`;
};
