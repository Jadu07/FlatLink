import nodemailer from 'nodemailer'

interface EnquiryEmailParams {
    hostEmail: string
    hostName: string
    enquirerName: string
    enquirerEmail: string
    enquirerPhone?: string | null
    listingTitle: string
    message: string
}

const getTransporter = () => {
    return nodemailer.createTransport({
        service: 'gmail', 
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    })
}

const getLogoHeader = () => `
    <div style="text-align: center; margin-bottom: 40px;">
        <h1 style="margin: 0; color: #164E44; font-size: 24px; font-weight: 800; letter-spacing: -0.5px; font-family: 'Helvetica Neue', Arial, sans-serif;">flat<span style="font-weight: 300; color: #111111;">link</span></h1>
    </div>
`

const getFooter = () => `
    <div style="text-align: center; margin-top: 60px; padding-top: 30px; border-top: 1px solid #eaeaea;">
        <p style="font-size: 12px; color: #888888; font-family: 'Helvetica Neue', Arial, sans-serif; letter-spacing: 0.5px; margin: 0;">&copy; ${new Date().getFullYear()} FlatLink. All rights reserved.</p>
    </div>
`

export const sendEnquiryEmail = async (params: EnquiryEmailParams) => {
    try {
        const transporter = getTransporter()
        const dateSent = new Date().toLocaleString()
        
        const phoneRow = params.enquirerPhone 
            ? `<tr><td style="padding: 14px 0; border-bottom: 1px solid #eaeaea; color: #666666; width: 100px;">Phone</td><td style="padding: 14px 0; border-bottom: 1px solid #eaeaea; color: #111111; font-weight: 500;">${params.enquirerPhone}</td></tr>` 
            : ''

        const htmlContent = `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 520px; margin: 0 auto; background-color: #ffffff; padding: 40px 20px;">
            ${getLogoHeader()}
            
            <p style="font-size: 16px; line-height: 1.6; color: #111111; margin-top: 0; margin-bottom: 24px;">Hi <strong>${params.hostName}</strong>,</p>
            <p style="font-size: 16px; line-height: 1.6; color: #333333; margin-top: 0; margin-bottom: 40px;">You have received a new enquiry for your listing <strong style="color: #111111;">${params.listingTitle}</strong>.</p>
            
            <h3 style="margin: 0 0 16px 0; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #888888;">Enquirer Details</h3>
            <table style="width: 100%; border-top: 1px solid #eaeaea; border-bottom: 1px solid #eaeaea; border-collapse: collapse; font-size: 15px; margin-bottom: 40px;">
                <tr>
                    <td style="padding: 14px 0; border-bottom: 1px solid #eaeaea; color: #666666; width: 100px;">Name</td>
                    <td style="padding: 14px 0; border-bottom: 1px solid #eaeaea; color: #111111; font-weight: 500;">${params.enquirerName}</td>
                </tr>
                <tr>
                    <td style="padding: 14px 0; border-bottom: 1px solid #eaeaea; color: #666666;">Email</td>
                    <td style="padding: 14px 0; border-bottom: 1px solid #eaeaea;"><a href="mailto:${params.enquirerEmail}" style="color: #164E44; text-decoration: none; font-weight: 500;">${params.enquirerEmail}</a></td>
                </tr>
                ${phoneRow}
                <tr>
                    <td style="padding: 14px 0; color: #666666;">Date</td>
                    <td style="padding: 14px 0; color: #111111; font-weight: 500;">${dateSent}</td>
                </tr>
            </table>
            
            <h3 style="margin: 0 0 16px 0; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #888888; text-align: left;">Message</h3>
            <div style="font-size: 16px; line-height: 1.7; color: #111111; white-space: pre-wrap; margin: 0; padding: 0; text-align: left;">${params.message}</div>
            
            ${getFooter()}
        </div>
        `

        const mailOptions = {
            from: `"FlatLink Enquiries" <${process.env.EMAIL_USER}>`,
            to: params.hostEmail,
            replyTo: params.enquirerEmail,
            subject: `New Enquiry for: ${params.listingTitle}`,
            html: htmlContent
        }

        const info = await transporter.sendMail(mailOptions)
        console.log('Enquiry email sent successfully to host:', info.messageId)
        return info
    } catch (error) {
        console.error('Error sending enquiry email to host:', error)
    }
}

export const sendEnquirerAcknowledgmentEmail = async (params: EnquiryEmailParams) => {
    try {
        const transporter = getTransporter()
        
        const htmlContent = `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 520px; margin: 0 auto; background-color: #ffffff; padding: 40px 20px;">
            ${getLogoHeader()}
            
            <p style="font-size: 16px; line-height: 1.6; color: #111111; margin-top: 0; margin-bottom: 24px;">Hi <strong>${params.enquirerName}</strong>,</p>
            <p style="font-size: 16px; line-height: 1.6; color: #333333; margin-top: 0; margin-bottom: 40px;">Thanks for using FlatLink. Your message for <strong style="color: #111111;">${params.listingTitle}</strong> has been successfully delivered to the host.</p>
            
            <h3 style="margin: 0 0 16px 0; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #888888; text-align: left;">Your Message</h3>
            <div style="font-size: 16px; line-height: 1.7; color: #666666; font-style: italic; white-space: pre-wrap; margin: 0 0 40px 0; padding: 0; text-align: left;">"${params.message}"</div>
            
            <p style="font-size: 15px; line-height: 1.6; color: #888888; margin: 0;">The host (${params.hostName}) will review your enquiry and reply directly to this email address.</p>
            
            ${getFooter()}
        </div>
        `

        const mailOptions = {
            from: `"FlatLink Enquiries" <${process.env.EMAIL_USER}>`,
            to: params.enquirerEmail,
            replyTo: params.hostEmail,
            subject: `Enquiry Sent: ${params.listingTitle}`,
            html: htmlContent
        }

        const info = await transporter.sendMail(mailOptions)
        console.log('Acknowledgment email sent successfully to enquirer:', info.messageId)
        return info
    } catch (error) {
        console.error('Error sending acknowledgment email to enquirer:', error)
    }
}
