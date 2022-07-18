import smtplib
from email import encoders
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email.mime.multipart import MIMEMultipart
from app import celery


def send_to_current_user(from_, password, to, subject, content, files_dict):
    msg = MIMEMultipart()
    msg.attach(MIMEText(content))
    msg['Subject'] = subject
    msg['From'] = from_
    msg['To'] = to
    if from_ == to:

        # attach files
        for name, t_con in files_dict.items():
            attachment = MIMEBase('application', "octet-stream")
            attachment.set_payload(t_con.encode())
            encoders.encode_base64(attachment)
            attachment.add_header('Content-Disposition', 'attachment; filename="%s"' % name)
            msg.attach(attachment)

    # send mail
    s = smtplib.SMTP(host='smtp.mail.ru', port=25)
    s.starttls()
    s.ehlo()
    s.login(from_, password)
    s.send_message(msg)
    s.quit()


@celery.task()
def sending(login, password, user_mail, text, files_dict):
    address_list = [
        [user_mail, "Заявка на перевод", "Ваша заявка принята"],
        [login, "Новая заявка", text]
    ]
    data = None
    for item in address_list:
        try:
            send_to_current_user(login, password, item[0], item[1], item[2], files_dict)
        except Exception as err:
            data = "Неверный адрес электронной почты"
            break
    return data
