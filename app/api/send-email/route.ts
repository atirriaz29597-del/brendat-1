import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Email recipient for contact form and order notifications
const RECIPIENT_EMAIL = process.env.NOTIFICATION_EMAIL || "no-reply@mail.brendat.com";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, data } = body;

    let subject = "";
    let htmlContent = "";

    if (type === "contact") {
      // Contact form submission
      const { name, email, phone, subject: msgSubject, message } = data;
      subject = `New Contact Form Submission: ${msgSubject || "General Inquiry"}`;
      htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #111827; padding: 20px; text-align: center;">
            <h1 style="color: #FF4A00; margin: 0;">Brendat</h1>
          </div>
          <div style="padding: 30px; background: #f9f9f9;">
            <h2 style="color: #111827; margin-top: 0;">New Contact Form Submission</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold; width: 140px;">Name:</td>
                <td style="padding: 10px; border-bottom: 1px solid #ddd;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold;">Email:</td>
                <td style="padding: 10px; border-bottom: 1px solid #ddd;"><a href="mailto:${email}">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold;">Phone:</td>
                <td style="padding: 10px; border-bottom: 1px solid #ddd;">${phone || "Not provided"}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold;">Subject:</td>
                <td style="padding: 10px; border-bottom: 1px solid #ddd;">${msgSubject || "General Inquiry"}</td>
              </tr>
            </table>
            <div style="margin-top: 20px; padding: 15px; background: white; border-radius: 8px; border: 1px solid #ddd;">
              <h3 style="margin-top: 0; color: #111827;">Message:</h3>
              <p style="color: #4b5563; line-height: 1.6;">${message}</p>
            </div>
          </div>
          <div style="background: #111827; padding: 15px; text-align: center;">
            <p style="color: #9ca3af; margin: 0; font-size: 12px;">This email was sent from the Brendat contact form.</p>
          </div>
        </div>
      `;
    } else if (type === "order") {
      // Multi-step order form submission
      const {
        entity,
        state,
        packageName,
        companyName,
        designator,
        filing,
        stateFee,
        expeditedFee,
        orderTotal,
        cardName,
        // Order details from all steps
        contactPerson,
        members,
        directors,
        officers,
        companyAddress,
        einInfo,
        taxConsultation,
      } = data;

      subject = `New Order: ${companyName} ${designator} - ${packageName} Package`;
      htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto;">
          <div style="background: #111827; padding: 20px; text-align: center;">
            <h1 style="color: #FF4A00; margin: 0;">Brendat</h1>
            <p style="color: #9ca3af; margin: 5px 0 0 0; font-size: 14px;">New Business Formation Order</p>
          </div>
          
          <div style="padding: 30px; background: #f9f9f9;">
            <!-- Order Summary -->
            <div style="background: white; border-radius: 12px; padding: 20px; margin-bottom: 20px; border: 1px solid #e5e7eb;">
              <h2 style="color: #FF4A00; margin-top: 0; border-bottom: 2px solid #FF4A00; padding-bottom: 10px;">Order Summary</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #4b5563;">Entity Type:</td>
                  <td style="padding: 8px 0; color: #111827;">${entity}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #4b5563;">Company Name:</td>
                  <td style="padding: 8px 0; color: #111827; font-weight: bold;">${companyName} ${designator}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #4b5563;">State:</td>
                  <td style="padding: 8px 0; color: #111827;">${state}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #4b5563;">Package:</td>
                  <td style="padding: 8px 0; color: #111827;">${packageName}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #4b5563;">Filing Speed:</td>
                  <td style="padding: 8px 0; color: #111827;">${filing === "expedited" ? "Expedited (2 business days)" : "Standard (1-2 weeks)"}</td>
                </tr>
              </table>
            </div>

            <!-- Pricing -->
            <div style="background: white; border-radius: 12px; padding: 20px; margin-bottom: 20px; border: 1px solid #e5e7eb;">
              <h3 style="color: #111827; margin-top: 0;">Pricing Breakdown</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #4b5563;">${packageName} Package:</td>
                  <td style="padding: 8px 0; text-align: right;">$${data.packagePrice || 0}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #4b5563;">${state} State Fee:</td>
                  <td style="padding: 8px 0; text-align: right;">$${stateFee}</td>
                </tr>
                ${expeditedFee > 0 ? `
                <tr>
                  <td style="padding: 8px 0; color: #4b5563;">Expedited Filing:</td>
                  <td style="padding: 8px 0; text-align: right;">$${expeditedFee}</td>
                </tr>
                ` : ""}
                <tr style="border-top: 2px solid #111827;">
                  <td style="padding: 12px 0; font-weight: bold; color: #111827; font-size: 18px;">Total:</td>
                  <td style="padding: 12px 0; text-align: right; font-weight: bold; color: #FF4A00; font-size: 18px;">$${orderTotal}</td>
                </tr>
              </table>
            </div>

            <!-- Contact Person -->
            ${contactPerson ? `
            <div style="background: white; border-radius: 12px; padding: 20px; margin-bottom: 20px; border: 1px solid #e5e7eb;">
              <h3 style="color: #111827; margin-top: 0;">Contact Person (Step 5)</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 6px 0; font-weight: bold; color: #4b5563; width: 140px;">Name:</td>
                  <td style="padding: 6px 0;">${contactPerson.firstName} ${contactPerson.lastName}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-weight: bold; color: #4b5563;">Email:</td>
                  <td style="padding: 6px 0;"><a href="mailto:${contactPerson.email}">${contactPerson.email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-weight: bold; color: #4b5563;">Phone:</td>
                  <td style="padding: 6px 0;">${contactPerson.phone}</td>
                </tr>
              </table>
            </div>
            ` : ""}

            <!-- Company Address -->
            ${companyAddress ? `
            <div style="background: white; border-radius: 12px; padding: 20px; margin-bottom: 20px; border: 1px solid #e5e7eb;">
              <h3 style="color: #111827; margin-top: 0;">Company Address (Step 6)</h3>
              ${companyAddress.useVirtualAddress ? `
                <p style="color: #FF4A00; font-weight: bold;">Using Virtual Address Service</p>
              ` : `
                <p style="margin: 0; line-height: 1.8;">
                  ${companyAddress.street1}<br/>
                  ${companyAddress.street2 ? companyAddress.street2 + "<br/>" : ""}
                  ${companyAddress.city}, ${companyAddress.state} ${companyAddress.zip}<br/>
                  ${companyAddress.country}
                </p>
              `}
            </div>
            ` : ""}

            <!-- Members -->
            ${members && members.length > 0 ? `
            <div style="background: white; border-radius: 12px; padding: 20px; margin-bottom: 20px; border: 1px solid #e5e7eb;">
              <h3 style="color: #111827; margin-top: 0;">Members/Owners</h3>
              ${members.map((m: { name: string; ownership: string }, i: number) => `
                <div style="padding: 10px; background: #f9f9f9; border-radius: 8px; margin-bottom: 8px;">
                  <strong>Member ${i + 1}:</strong> ${m.name} - ${m.ownership}% ownership
                </div>
              `).join("")}
            </div>
            ` : ""}

            <!-- Directors -->
            ${directors && directors.length > 0 ? `
            <div style="background: white; border-radius: 12px; padding: 20px; margin-bottom: 20px; border: 1px solid #e5e7eb;">
              <h3 style="color: #111827; margin-top: 0;">Directors (Step 7)</h3>
              ${directors.map((d: { name: string; title: string }, i: number) => `
                <div style="padding: 10px; background: #f9f9f9; border-radius: 8px; margin-bottom: 8px;">
                  <strong>Director ${i + 1}:</strong> ${d.name}${d.title ? ` - ${d.title}` : ""}
                </div>
              `).join("")}
            </div>
            ` : ""}

            <!-- Officers -->
            ${officers ? `
            <div style="background: white; border-radius: 12px; padding: 20px; margin-bottom: 20px; border: 1px solid #e5e7eb;">
              <h3 style="color: #111827; margin-top: 0;">Officers (Step 7)</h3>
              <table style="width: 100%; border-collapse: collapse;">
                ${officers.president ? `<tr><td style="padding: 6px 0; font-weight: bold;">President:</td><td>${officers.president}</td></tr>` : ""}
                ${officers.secretary ? `<tr><td style="padding: 6px 0; font-weight: bold;">Secretary:</td><td>${officers.secretary}</td></tr>` : ""}
                ${officers.treasurer ? `<tr><td style="padding: 6px 0; font-weight: bold;">Treasurer:</td><td>${officers.treasurer}</td></tr>` : ""}
              </table>
            </div>
            ` : ""}

            <!-- EIN Info -->
            ${einInfo ? `
            <div style="background: white; border-radius: 12px; padding: 20px; margin-bottom: 20px; border: 1px solid #e5e7eb;">
              <h3 style="color: #111827; margin-top: 0;">EIN/Tax ID Info (Step 8)</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 6px 0; font-weight: bold; color: #4b5563;">Responsible Party:</td>
                  <td style="padding: 6px 0;">${einInfo.responsibleParty}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-weight: bold; color: #4b5563;">SSN/ITIN:</td>
                  <td style="padding: 6px 0;">${einInfo.ssn ? "***-**-" + einInfo.ssn.slice(-4) : "Not provided"}</td>
                </tr>
              </table>
            </div>
            ` : ""}

            <!-- Tax Consultation -->
            ${taxConsultation !== undefined ? `
            <div style="background: white; border-radius: 12px; padding: 20px; margin-bottom: 20px; border: 1px solid #e5e7eb;">
              <h3 style="color: #111827; margin-top: 0;">Tax Consultation (Step 9)</h3>
              <p style="margin: 0;">${taxConsultation ? "Customer requested tax consultation" : "Customer declined tax consultation"}</p>
            </div>
            ` : ""}

            <!-- Billing -->
            <div style="background: white; border-radius: 12px; padding: 20px; border: 1px solid #e5e7eb;">
              <h3 style="color: #111827; margin-top: 0;">Billing Information (Step 10)</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 6px 0; font-weight: bold; color: #4b5563;">Cardholder Name:</td>
                  <td style="padding: 6px 0;">${cardName}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-weight: bold; color: #22c55e;">Payment Status:</td>
                  <td style="padding: 6px 0; color: #22c55e; font-weight: bold;">PAID</td>
                </tr>
              </table>
            </div>
          </div>

          <div style="background: #111827; padding: 15px; text-align: center;">
            <p style="color: #9ca3af; margin: 0; font-size: 12px;">This is an automated notification from the Brendat order system.</p>
          </div>
        </div>
      `;
    } else {
      return NextResponse.json(
        { ok: false, message: "Invalid email type" },
        { status: 400 }
      );
    }

    const { data: emailData, error } = await resend.emails.send({
      from: "Brendat <no-reply@mail.brendat.com>",
      to: [RECIPIENT_EMAIL],
      subject,
      html: htmlContent,
      replyTo: type === "contact" ? data.email : undefined,
    });

    if (error) {
      console.error("[send-email] Resend error:", JSON.stringify(error, null, 2));
      return NextResponse.json(
        { ok: false, message: error.message, details: error },
        { status: 500 } gg
      );
    }

    console.log("[send-email] Email sent successfully:", emailData?.id);
    return NextResponse.json({ ok: true, message: "Email sent successfully", id: emailData?.id });
  } catch (err) {
    console.error("[send-email] Unexpected error:", err);
    return NextResponse.json(
      { ok: false, message: "Failed to send email" },
      { status: 500 }
    );
  }
}
