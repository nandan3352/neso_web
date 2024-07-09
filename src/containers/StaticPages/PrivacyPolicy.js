import { Container, makeStyles } from "@material-ui/core";
import { useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 32,
  },

  heading: {
    ...theme.typography.h4,
    marginBottom: 32,
  },

  heading2: {
    ...theme.typography.h6,
    marginBottom: 32,
  },

  content: {
    ...theme.typography.body1,
    paddingBottom: 32,
  },
}));

const PrivacyPolicy = () => {
  useEffect(() => {
    document.title = "Privacy Policy | Neso Academy";
  }, []);

  const classes = useStyles();
  return (
    <Container className={classes.root}>
      <div className={classes.heading}>PRIVACY NOTICE</div>
      <div className={classes.content}>
        <p>&nbsp;</p>
        <p>
          <strong>Last updated&nbsp;July 11, 2023</strong>
        </p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>
          Thank you for choosing to be part of our community at&nbsp;Neso
          Academy Private Limited&nbsp;("<strong>Company</strong>", "
          <strong>we</strong>", "<strong>us</strong>", "<strong>our</strong>").
          We are committed to protecting your personal information and your
          right to privacy. If you have any questions or concerns about this
          privacy notice, or our practices with regards to your personal
          information, please contact us at&nbsp;admin@nesoacademy.org.
        </p>
        <p>
          <br />{" "}
        </p>
        <p>
          When you&nbsp;visit our website&nbsp;
          <u>
            <a href="https://www.nesoacademy.org/">
              https://www.nesoacademy.org
            </a>
          </u>
          &nbsp;(the "<strong>Website</strong>"),&nbsp;use our mobile
          application,&nbsp;as the case may be (the "<strong>App</strong>
          ")&nbsp;and more generally, use any of our services (the "
          <strong>Services</strong>", which include
          the&nbsp;Website&nbsp;and&nbsp;App), we appreciate that you are
          trusting us with your personal information. We take your privacy very
          seriously. In this privacy notice, we seek to explain to you in the
          clearest way possible what information we collect, how we use it and
          what rights you have in relation to it. We hope you take some time to
          read through it carefully, as it is important. If there are any terms
          in this privacy notice that you do not agree with, please discontinue
          use of our Services immediately.
        </p>
        <p>
          <br />{" "}
        </p>
        <p>
          This privacy notice applies to all information collected through our
          Services (which, as described above, includes
          our&nbsp;Website&nbsp;and&nbsp;App), as well as, any related services,
          sales, marketing or events.
        </p>
        <p>
          <br />{" "}
        </p>
        <p>
          <strong>
            Please read this privacy notice carefully as it will help you
            understand what we do with the information that we collect.
          </strong>
        </p>
        <p>
          <br />{" "}
        </p>
        <p>&nbsp;</p>
        <ol>
          <li>
            <strong> WHAT INFORMATION DO WE COLLECT?</strong>
          </li>
        </ol>
        <p>
          <strong>
            <u>
              <br />{" "}
            </u>
          </strong>
          <strong>Personal information you disclose to us</strong>
        </p>
        <p>&nbsp;</p>
        <p>
          <strong>
            <em>In Short:&nbsp;&nbsp;</em>
          </strong>
          <em>We collect personal information that you provide to us.</em>
        </p>
        <p>&nbsp;</p>
        <p>
          We collect personal information that you voluntarily provide to us
          when you&nbsp;register on the&nbsp;Services,&nbsp;express an interest
          in obtaining information about us or our products and Services, when
          you participate in activities on the&nbsp;Services&nbsp;(such as by
          posting messages in our online forums or entering competitions,
          contests or giveaways)&nbsp;or otherwise when you contact us.
        </p>
        <p>&nbsp;</p>
        <p>
          The personal information that we collect depends on the context of
          your interactions with us and the&nbsp;Services, the choices you make
          and the products and features you use. The personal information we
          collect may include the following:
        </p>
        <p>&nbsp;</p>
        <p>
          <strong>Personal Information Provided by You.</strong>&nbsp;We
          collect&nbsp;names;&nbsp;phone numbers;&nbsp;email
          addresses;&nbsp;billing addresses;&nbsp;and other similar information.
        </p>
        <p>&nbsp;</p>
        <p>
          <strong>Payment Data.</strong>&nbsp;We may collect data necessary to
          process your payment if you make purchases, such as your payment
          instrument number (such as a credit card number), and the security
          code associated with your payment instrument. All payment data is
          stored by&nbsp;Razorpay. You may find their privacy notice link(s)
          here:&nbsp;
          <u>
            <a href="https://razorpay.com/privacy/">
              https://razorpay.com/privacy/
            </a>
          </u>
          .
        </p>
        <p>&nbsp;</p>
        <p>
          <strong>Social Media Login Data.&nbsp;</strong>We may provide you with
          the option to register with us using your existing social media
          account details, like your Facebook, Twitter or other social media
          account. If you choose to register in this way, we will collect the
          information described in the section called "
          <u>
            <a href="#sociallogins">HOW DO WE HANDLE YOUR SOCIAL LOGINS?</a>
          </u>
          " below.
        </p>
        <p>&nbsp;</p>
        <p>
          <strong>Analytics.</strong> We use Google Analytics to analyze website
          traffic, user behavior, and gain insights into how visitors interact
          with our website. This information helps us improve our website
          content, user experience, and marketing efforts.
        </p>
        <p>&nbsp;</p>
        <p>
          <strong>Advertising.</strong> We use Google AdSense to display
          relevant advertisements on our website. Google AdSense may collect
          non-personal information about your browsing activities to deliver
          targeted ads based on your interests and preferences.
        </p>
        <p>&nbsp;</p>
        <p>
          <strong>Google Fonts.</strong> We use Google Fonts to enhance the
          visual appearance of our website. When you access our website, your
          browser may automatically download the required fonts from Google's
          servers. This process may involve sending non-personal information to
          Google.
        </p>
        <p>&nbsp;</p>
        <p>
          All personal information that you provide to us must be true, complete
          and accurate, and you must notify us of any changes to such personal
          information.
        </p>
        <p>
          <strong>
            <u>
              <br />{" "}
            </u>
          </strong>
          <strong>Information automatically collected</strong>
        </p>
        <p>&nbsp;</p>
        <p>
          <strong>
            <em>In Short:&nbsp;&nbsp;</em>
          </strong>
          <em>
            Some information &mdash; such as your Internet Protocol (IP) address
            and/or browser and device characteristics &mdash; is collected
            automatically when you visit our&nbsp;Services.
          </em>
        </p>
        <p>&nbsp;</p>
        <p>
          We automatically collect certain information when you visit, use or
          navigate the&nbsp;Services. This information does not reveal your
          specific identity (like your name or contact information) but may
          include device and usage information, such as your IP address, browser
          and device characteristics, operating system, language preferences,
          referring URLs, device name, country, location, information about how
          and when you use our&nbsp;Services&nbsp;and other technical
          information. This information is primarily needed to maintain the
          security and operation of our&nbsp;Services, and for our internal
          analytics and reporting purposes.
        </p>
        <p>&nbsp;</p>
        <p>The information we collect includes:</p>
        <ul>
          <li>
            <em>Log and Usage Data.</em>&nbsp;Log and usage data is
            service-related, diagnostic, usage and performance information our
            servers automatically collect when you access or use
            our&nbsp;Services&nbsp;and which we record in log files. Depending
            on how you interact with us, this log data may include your IP
            address, device information, browser type and settings and
            information about your activity in the&nbsp;Services&nbsp;(such as
            the date/time stamps associated with your usage, pages and files
            viewed, searches and other actions you take such as which features
            you use), device event information (such as system activity, error
            reports (sometimes called 'crash dumps') and hardware settings).
          </li>
        </ul>
        <ul>
          <li>
            <em>Device Data.</em>&nbsp;We collect device data such as
            information about your computer, phone, tablet or other device you
            use to access the&nbsp;Services. Depending on the device used, this
            device data may include information such as your IP address (or
            proxy server), device and application identification numbers,
            location, browser type, hardware model Internet service provider
            and/or mobile carrier, operating system and system configuration
            information.
          </li>
        </ul>
        <p>
          <strong>
            <u>
              <br />{" "}
            </u>
          </strong>
          <strong>Information collected through our App</strong>
        </p>
        <p>&nbsp;</p>
        <p>
          <strong>
            <em>In Short:&nbsp;&nbsp;</em>
          </strong>
          <em>
            We collect information regarding your&nbsp;push
            notifications,&nbsp;when you use our App.
          </em>
        </p>
        <p>&nbsp;</p>
        <p>If you use our App, we also collect the following information:</p>
        <ul>
          <li>
            <em>Push Notifications.&nbsp;</em>We may request to send you push
            notifications regarding your account or certain features of the App.
            If you wish to opt-out from receiving these types of communications,
            you may turn them off in your device's settings.
          </li>
        </ul>
        <p>
          This information is primarily needed to maintain the security and
          operation of our App, for troubleshooting and for our internal
          analytics and reporting purposes.
        </p>
        <p>&nbsp;</p>
        <ol start="2">
          <li>
            <strong> HOW DO WE USE YOUR INFORMATION?</strong>
          </li>
        </ol>
        <p>&nbsp;</p>
        <p>
          <strong>
            <em>In Short: &nbsp;</em>
          </strong>
          <em>
            We process your information for purposes based on legitimate
            business interests, the fulfillment of our contract with you,
            compliance with our legal obligations, and/or your consent.
          </em>
        </p>
        <p>&nbsp;</p>
        <p>
          We use personal information collected via our&nbsp;Services&nbsp;for a
          variety of business purposes described below. We process your personal
          information for these purposes in reliance on our legitimate business
          interests, in order to enter into or perform a contract with you, with
          your consent, and/or for compliance with our legal obligations. We
          indicate the specific processing grounds we rely on next to each
          purpose listed below.
        </p>
        <p>&nbsp;</p>
        <p>We use the information we collect or receive:</p>
        <ul>
          <li>
            <strong>To facilitate account creation and logon process.</strong>
            &nbsp;If you choose to link your account with us to a third-party
            account (such as your Google or Facebook account), we use the
            information you allowed us to collect from those third parties to
            facilitate account creation and logon process for the performance of
            the contract.&nbsp;See the section below headed "
            <u>
              <a href="#sociallogins">HOW DO WE HANDLE YOUR SOCIAL LOGINS?</a>
            </u>
            " for further information.
          </li>
        </ul>
        <ul>
          <li>
            <strong>To post testimonials.</strong>&nbsp;We post testimonials on
            our&nbsp;Services&nbsp;that may contain personal information. Prior
            to posting a testimonial, we will obtain your consent to use your
            name and the content of the testimonial. If you wish to update, or
            delete your testimonial, please contact us
            at&nbsp;admin@nesoacademy.org&nbsp;and be sure to include your name,
            testimonial location, and contact information.
          </li>
        </ul>
        <ul>
          <li>
            <strong>Request feedback.&nbsp;</strong>We may use your information
            to request feedback and to contact you about your use of
            our&nbsp;Services.
          </li>
        </ul>
        <ul>
          <li>
            <strong>To enable user-to-user communications.</strong>&nbsp;We may
            use your information in order to enable user-to-user communications
            with each user's consent.
          </li>
        </ul>
        <ul>
          <li>
            <strong>To manage user accounts.&nbsp;</strong>We may use your
            information for the purposes of managing our account and keeping it
            in working order.
          </li>
        </ul>
        <ul>
          <li>
            <strong>To send administrative information to you.&nbsp;</strong>We
            may use your personal information to send you product, service and
            new feature information and/or information about changes to our
            terms, conditions, and policies.
          </li>
        </ul>
        <ul>
          <li>
            <strong>To protect our Services.&nbsp;</strong>We may use your
            information as part of our efforts to keep
            our&nbsp;Services&nbsp;safe and secure (for example, for fraud
            monitoring and prevention).
          </li>
        </ul>
        <ul>
          <li>
            <strong>
              To enforce our terms, conditions and policies for business
              purposes, to comply with legal and regulatory requirements or in
              connection with our contract.
            </strong>
          </li>
        </ul>
        <ul>
          <li>
            <strong>
              To respond to legal requests and prevent harm.&nbsp;
            </strong>
            If we receive a subpoena or other legal request, we may need to
            inspect the data we hold to determine how to respond.
          </li>
        </ul>
        <ul>
          <li>
            <strong>Fulfill and manage your orders.&nbsp;</strong>We may use
            your information to fulfill and manage your orders, payments,
            returns, and exchanges made through the&nbsp;Services.
          </li>
        </ul>
        <ul>
          <li>
            <strong>Administer prize draws and competitions.</strong>&nbsp;We
            may use your information to administer prize draws and competitions
            when you elect to participate in our competitions.
          </li>
        </ul>
        <ul>
          <li>
            <strong>
              To deliver and facilitate delivery of services to the user.
            </strong>
            &nbsp;We may use your information to provide you with the requested
            service.
          </li>
        </ul>
        <ul>
          <li>
            <strong>
              To respond to user inquiries/offer support to users.
            </strong>
            &nbsp;We may use your information to respond to your inquiries and
            solve any potential issues you might have with the use of our
            Services.
          </li>
        </ul>
        <p>&nbsp;</p>
        <ol start="3">
          <li>
            <strong> WILL YOUR INFORMATION BE SHARED WITH ANYONE?</strong>
          </li>
        </ol>
        <p>&nbsp;</p>
        <p>
          <strong>
            <em>In Short:</em>
          </strong>
          <em>
            &nbsp; We only share information with your consent, to comply with
            laws, to provide you with services, to protect your rights, or to
            fulfill business obligations.
          </em>
        </p>
        <p>&nbsp;</p>
        <p>
          We may process or share your data that we hold based on the following
          legal basis:
        </p>
        <ul>
          <li>
            <strong>Consent:</strong>&nbsp;We may process your data if you have
            given us specific consent to use your personal information for a
            specific purpose.
          </li>
        </ul>
        <ul>
          <li>
            <strong>Legitimate Interests:</strong>&nbsp;We may process your data
            when it is reasonably necessary to achieve our legitimate business
            interests.
          </li>
        </ul>
        <ul>
          <li>
            <strong>Performance of a Contract:</strong>&nbsp;Where we have
            entered into a contract with you, we may process your personal
            information to fulfill the terms of our contract.
          </li>
        </ul>
        <ul>
          <li>
            <strong>Legal Obligations:</strong>&nbsp;We may disclose your
            information where we are legally required to do so in order to
            comply with applicable law, governmental requests, a judicial
            proceeding, court order, or legal process, such as in response to a
            court order or a subpoena (including in response to public
            authorities to meet national security or law enforcement
            requirements).
          </li>
        </ul>
        <ul>
          <li>
            <strong>Vital Interests:</strong>&nbsp;We may disclose your
            information where we believe it is necessary to investigate,
            prevent, or take action regarding potential violations of our
            policies, suspected fraud, situations involving potential threats to
            the safety of any person and illegal activities, or as evidence in
            litigation in which we are involved.
          </li>
        </ul>
        <p>
          More specifically, we may need to process your data or share your
          personal information in the following situations:
        </p>
        <ul>
          <li>
            <strong>Business Transfers.</strong>&nbsp;We may share or transfer
            your information in connection with, or during negotiations of, any
            merger, sale of company assets, financing, or acquisition of all or
            a portion of our business to another company.
          </li>
        </ul>
        <ul>
          <li>
            <strong>Other Users.&nbsp;</strong>When you share personal
            information&nbsp;(for example, by posting comments, contributions or
            other content to the&nbsp;Services)&nbsp;or otherwise interact with
            public areas of the&nbsp;Services, such personal information may be
            viewed by all users and may be publicly made available outside
            the&nbsp;Services&nbsp;in perpetuity.&nbsp;If you interact with
            other users of our&nbsp;Services&nbsp;and register for
            our&nbsp;Services&nbsp;through a social network (such as Facebook),
            your contacts on the social network will see your name, profile
            photo, and descriptions of your activity.&nbsp;Similarly, other
            users will be able to view descriptions of your activity,
            communicate with you within our&nbsp;Services, and view your
            profile.
          </li>
        </ul>
        <p>&nbsp;</p>
        <ol id="sociallogins" start="4">
          <li>
            <strong> HOW DO WE HANDLE YOUR SOCIAL LOGINS?</strong>&nbsp;
          </li>
        </ol>
        <p>&nbsp;</p>
        <p>
          <strong>
            <em>In Short: &nbsp;</em>
          </strong>
          <em>
            If you choose to register or log in to our services using a social
            media account, we may have access to certain information about you.
          </em>
        </p>
        <p>&nbsp;</p>
        <p>
          Our&nbsp;Services&nbsp;offers you the ability to register and login
          using your third-party social media account details (like your
          Facebook or Google logins). Where you choose to do this, we will
          receive certain profile information about you from your social media
          provider. The profile information we receive may vary depending on the
          social media provider concerned, but will often include your name,
          email address, display name, profile picture as well as other
          information you choose to make public on such social media platform.
        </p>
        <p>&nbsp;</p>
        <p>
          We will use the information we receive only for the purposes that are
          described in this privacy notice or that are otherwise made clear to
          you on the relevant&nbsp;Services. Please note that we do not control,
          and are not responsible for, other uses of your personal information
          by your third-party social media provider. We recommend that you
          review their privacy notice to understand how they collect, use and
          share your personal information, and how you can set your privacy
          preferences on their sites and apps.
        </p>
        <p>&nbsp;</p>
        <ol start="5">
          <li>
            <strong> WHAT IS OUR STANCE ON THIRD-PARTY WEBSITES?</strong>
          </li>
        </ol>
        <p>&nbsp;</p>
        <p>
          <strong>
            <em>In Short:&nbsp;</em>
          </strong>
          <em>
            &nbsp;We are not responsible for the safety of any information that
            you share with third-party providers who advertise, but are not
            affiliated with, our Website.
          </em>
        </p>
        <p>&nbsp;</p>
        <p>
          The&nbsp;Services&nbsp;may contain advertisements from third parties
          that are not affiliated with us and which may link to other websites,
          online services or mobile applications. We cannot guarantee the safety
          and privacy of data you provide to any third parties. Any data
          collected by third parties is not covered by this privacy notice. We
          are not responsible for the content or privacy and security practices
          and policies of any third parties, including other websites, services
          or applications that may be linked to or from the&nbsp;Services. You
          should review the policies of such third parties and contact them
          directly to respond to your questions.
        </p>
        <p>&nbsp;</p>
        <ol start="6">
          <li>
            <strong> HOW LONG DO WE KEEP YOUR INFORMATION?</strong>
          </li>
        </ol>
        <p>&nbsp;</p>
        <p>
          <strong>
            <em>In Short:&nbsp;</em>
          </strong>
          <em>
            &nbsp;We keep your information for as long as necessary to fulfill
            the purposes outlined in this privacy notice unless otherwise
            required by law.
          </em>
        </p>
        <p>&nbsp;</p>
        <p>
          We will only keep your personal information for as long as it is
          necessary for the purposes set out in this privacy notice, unless a
          longer retention period is required or permitted by law (such as tax,
          accounting or other legal requirements). No purpose in this notice
          will require us keeping your personal information for longer
          than&nbsp;the period of time in which users have an account with us.
        </p>
        <p>&nbsp;</p>
        <p>
          When we have no ongoing legitimate business need to process your
          personal information, we will either delete or anonymize such
          information, or, if this is not possible (for example, because your
          personal information has been stored in backup archives), then we will
          securely store your personal information and isolate it from any
          further processing until deletion is possible.
        </p>
        <p>&nbsp;</p>
        <ol start="7">
          <li>
            <strong> HOW DO WE KEEP YOUR INFORMATION SAFE?</strong>
          </li>
        </ol>
        <p>&nbsp;</p>
        <p>
          <strong>
            <em>In Short:&nbsp;</em>
          </strong>
          <em>
            &nbsp;We aim to protect your personal information through a system
            of organizational and technical security measures.
          </em>
        </p>
        <p>&nbsp;</p>
        <p>
          We have implemented appropriate technical and organizational security
          measures designed to protect the security of any personal information
          we process. However, despite our safeguards and efforts to secure your
          information, no electronic transmission over the Internet or
          information storage technology can be guaranteed to be 100% secure, so
          we cannot promise or guarantee that hackers, cybercriminals, or other
          unauthorized third parties will not be able to defeat our security,
          and improperly collect, access, steal, or modify your information.
          Although we will do our best to protect your personal information,
          transmission of personal information to and from
          our&nbsp;Services&nbsp;is at your own risk. You should only access
          the&nbsp;Services&nbsp;within a secure environment.
        </p>
        <p>&nbsp;</p>
        <ol start="8">
          <li>
            <strong> WHAT ARE YOUR PRIVACY RIGHTS?</strong>
          </li>
        </ol>
        <p>&nbsp;</p>
        <p>
          <strong>
            <em>In Short:</em>
          </strong>
          <em>
            &nbsp;&nbsp;In some regions, such as the European Economic Area
            (EEA) and United Kingdom (UK), you have rights that allow you
            greater access to and control over your personal
            information.&nbsp;You may review, change, or terminate your account
            at any time.
          </em>
        </p>
        <p>&nbsp;</p>
        <p>
          In some regions (like the EEA and UK), you have certain rights under
          applicable data protection laws. These may include the right (i) to
          request access and obtain a copy of your personal information, (ii) to
          request rectification or erasure; (iii) to restrict the processing of
          your personal information; and (iv) if applicable, to data
          portability. In certain circumstances, you may also have the right to
          object to the processing of your personal information. To make such a
          request, please use the&nbsp;
          <u>
            <a href="#contact">contact details</a>
          </u>
          &nbsp;provided below. We will consider and act upon any request in
          accordance with applicable data protection laws.
        </p>
        <p>&nbsp;</p>
        <p>
          If we are relying on your consent to process your personal
          information, you have the right to withdraw your consent at any time.
          Please note however that this will not affect the lawfulness of the
          processing before its withdrawal, nor will it affect the processing of
          your personal information conducted in reliance on lawful processing
          grounds other than consent.
        </p>
        <p>&nbsp;</p>
        <p>
          If you are a resident in the EEA or UK and you believe we are
          unlawfully processing your personal information, you also have the
          right to complain to your local data protection supervisory authority.
          You can find their contact details here:&nbsp;
          <u>
            <a href="http://ec.europa.eu/justice/data-protection/bodies/authorities/index_en.htm">
              http://ec.europa.eu/justice/data-protection/bodies/authorities/index_en.htm
            </a>
          </u>
          .
        </p>
        <p>&nbsp;</p>
        <p>
          If you are a resident in Switzerland, the contact details for the data
          protection authorities are available here:&nbsp;
          <u>
            <a href="https://www.edoeb.admin.ch/edoeb/en/home.html">
              https://www.edoeb.admin.ch/edoeb/en/home.html
            </a>
          </u>
          .
        </p>
        <p>&nbsp;</p>
        <p>
          If you have questions or comments about your privacy rights, you may
          email us at&nbsp;admin@nesoacademy.org.
        </p>
        <p>
          <strong>
            <u>
              <br />{" "}
            </u>
          </strong>
          <strong>Account Information</strong>
        </p>
        <p>&nbsp;</p>
        <p>
          If you would at any time like to review or change the information in
          your account or terminate your account, you can:
        </p>
        <ul>
          <li>Log in to your account settings and update your user account.</li>
        </ul>
        <ul>
          <li>Contact us using the contact information provided.</li>
        </ul>
        <p>
          Upon your request to terminate your account, we will deactivate or
          delete your account and information from our active databases.
          However, we may retain some information in our files to prevent fraud,
          troubleshoot problems, assist with any investigations, enforce our
          Terms of Use and/or comply with applicable legal requirements.
        </p>
        <p>&nbsp;</p>
        <p>
          <strong>
            <u>Opting out of email marketing:</u>
          </strong>
          &nbsp;You can unsubscribe from our marketing email list at any time by
          clicking on the unsubscribe link in the emails that we send or by
          contacting us using the details provided below. You will then be
          removed from the marketing email list &mdash; however, we may still
          communicate with you, for example to send you service-related emails
          that are necessary for the administration and use of your account, to
          respond to service requests, or for other non-marketing purposes. To
          otherwise opt-out, you may:
        </p>
        <ul>
          <li>Contact us using the contact information provided.</li>
        </ul>
        <p>&nbsp;</p>
        <ol start="9">
          <li>
            <strong> CONTROLS FOR DO-NOT-TRACK FEATURES</strong>
          </li>
        </ol>
        <p>&nbsp;</p>
        <p>
          Most web browsers and some mobile operating systems and mobile
          applications include a Do-Not-Track ("DNT") feature or setting you can
          activate to signal your privacy preference not to have data about your
          online browsing activities monitored and collected. At this stage no
          uniform technology standard for recognizing and implementing DNT
          signals has been finalized. As such, we do not currently respond to
          DNT browser signals or any other mechanism that automatically
          communicates your choice not to be tracked online. If a standard for
          online tracking is adopted that we must follow in the future, we will
          inform you about that practice in a revised version of this privacy
          notice.&nbsp;
        </p>
        <p>&nbsp;</p>
        <ol start="10">
          <li>
            <strong>
              {" "}
              DO CALIFORNIA RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?
            </strong>
          </li>
        </ol>
        <p>&nbsp;</p>
        <p>
          <strong>
            <em>In Short:&nbsp;</em>
          </strong>
          <em>
            &nbsp;Yes, if you are a resident of California, you are granted
            specific rights regarding access to your personal information.
          </em>
        </p>
        <p>&nbsp;</p>
        <p>
          California Civil Code Section 1798.83, also known as the "Shine The
          Light" law, permits our users who are California residents to request
          and obtain from us, once a year and free of charge, information about
          categories of personal information (if any) we disclosed to third
          parties for direct marketing purposes and the names and addresses of
          all third parties with which we shared personal information in the
          immediately preceding calendar year. If you are a California resident
          and would like to make such a request, please submit your request in
          writing to us using the contact information provided below.
        </p>
        <p>&nbsp;</p>
        <p>
          If you are under 18 years of age, reside in California, and have a
          registered account with&nbsp;a Service, you have the right to request
          removal of unwanted data that you publicly post on the&nbsp;Services.
          To request removal of such data, please contact us using the contact
          information provided below, and include the email address associated
          with your account and a statement that you reside in California. We
          will make sure the data is not publicly displayed on
          the&nbsp;Services, but please be aware that the data may not be
          completely or comprehensively removed from all our systems (e.g.
          backups, etc.).
        </p>
        <p>
          <strong>
            <u>
              <br />{" "}
            </u>
          </strong>
          <strong>CCPA Privacy Notice</strong>
        </p>
        <p>&nbsp;</p>
        <p>The California Code of Regulations defines a "resident" as:</p>
        <p>&nbsp;</p>
        <p>
          (1) every individual who is in the State of California for other than
          a temporary or transitory purpose and
        </p>
        <p>
          (2) every individual who is domiciled in the State of California who
          is outside the State of California for a temporary or transitory
          purpose
        </p>
        <p>&nbsp;</p>
        <p>All other individuals are defined as "non-residents."</p>
        <p>&nbsp;</p>
        <p>
          If this definition of "resident" applies to you, we must adhere to
          certain rights and obligations regarding your personal information.
        </p>
        <p>&nbsp;</p>
        <p>
          <strong>
            What categories of personal information do we collect?
          </strong>
        </p>
        <p>&nbsp;</p>
        <p>
          We have collected the following categories of personal information in
          the past twelve (12) months:
        </p>
        <p>&nbsp;</p>
        <table width="751">
          <tbody>
            <tr>
              <td width="252">
                <p>
                  <br /> <strong>Category</strong>
                  <br />{" "}
                </p>
              </td>
              <td width="383">
                <p>
                  <br /> <strong>Examples</strong>
                  <br />{" "}
                </p>
              </td>
              <td width="110">
                <p>
                  <br /> <strong>Collected</strong>
                  <br />{" "}
                </p>
              </td>
            </tr>
            <tr>
              <td width="252">
                <p>A. Identifiers</p>
              </td>
              <td width="383">
                <p>
                  Contact details, such as real name, alias, postal address,
                  telephone or mobile contact number, unique personal
                  identifier, online identifier, Internet Protocol address,
                  email address and account name
                </p>
              </td>
              <td width="110">
                <p>&nbsp;</p>
                <p>YES</p>
              </td>
            </tr>
            <tr>
              <td width="252">
                <p>
                  B. Personal information categories listed in the California
                  Customer Records statute
                </p>
              </td>
              <td width="383">
                <p>
                  Name, contact information, education, employment, employment
                  history and financial information
                </p>
              </td>
              <td width="110">
                <p>&nbsp;</p>
                <p>YES</p>
              </td>
            </tr>
            <tr>
              <td width="252">
                <p>
                  C. Protected classification characteristics under California
                  or federal law
                </p>
              </td>
              <td width="383">
                <p>Gender and date of birth</p>
              </td>
              <td width="110">
                <p>&nbsp;</p>
                <p>NO</p>
              </td>
            </tr>
            <tr>
              <td width="252">
                <p>D. Commercial information</p>
              </td>
              <td width="383">
                <p>
                  Transaction information, purchase history, financial details
                  and payment information
                </p>
              </td>
              <td width="110">
                <p>&nbsp;</p>
                <p>NO</p>
              </td>
            </tr>
            <tr>
              <td width="252">
                <p>E. Biometric information</p>
              </td>
              <td width="383">
                <p>Fingerprints and voiceprints</p>
              </td>
              <td width="110">
                <p>&nbsp;</p>
                <p>NO</p>
              </td>
            </tr>
            <tr>
              <td width="252">
                <p>F. Internet or other similar network activity</p>
              </td>
              <td width="383">
                <p>
                  Browsing history, search history, online behavior, interest
                  data, and interactions with our and other websites,
                  applications, systems and advertisements
                </p>
              </td>
              <td width="110">
                <p>&nbsp;</p>
                <p>NO</p>
                <p>
                  <br />{" "}
                </p>
              </td>
            </tr>
            <tr>
              <td width="252">
                <p>G. Geolocation data</p>
              </td>
              <td width="383">
                <p>Device location</p>
              </td>
              <td width="110">
                <p>&nbsp;</p>
                <p>NO</p>
              </td>
            </tr>
            <tr>
              <td width="252">
                <p>
                  H. Audio, electronic, visual, thermal, olfactory, or similar
                  information
                </p>
              </td>
              <td width="383">
                <p>
                  Images and audio, video or call recordings created in
                  connection with our business activities
                </p>
              </td>
              <td width="110">
                <p>&nbsp;</p>
                <p>NO</p>
              </td>
            </tr>
            <tr>
              <td width="252">
                <p>I. Professional or employment-related information</p>
              </td>
              <td width="383">
                <p>
                  Business contact details in order to provide you our services
                  at a business level, job title as well as work history and
                  professional qualifications if you apply for a job with us
                </p>
              </td>
              <td width="110">
                <p>&nbsp;</p>
                <p>NO</p>
              </td>
            </tr>
            <tr>
              <td width="252">
                <p>J. Education Information</p>
              </td>
              <td width="383">
                <p>Student records and directory information</p>
              </td>
              <td width="110">
                <p>&nbsp;</p>
                <p>NO</p>
              </td>
            </tr>
            <tr>
              <td width="252">
                <p>K. Inferences drawn from other personal information</p>
              </td>
              <td width="383">
                <p>
                  Inferences drawn from any of the collected personal
                  information listed above to create a profile or summary about,
                  for example, an individual&rsquo;s preferences and
                  characteristics
                </p>
              </td>
              <td width="110">
                <p>&nbsp;</p>
                <p>NO</p>
              </td>
            </tr>
          </tbody>
        </table>
        <p>&nbsp;</p>
        <p>
          We may also collect other personal information outside of these
          categories instances where you interact with us in-person, online, or
          by phone or mail in the context of:
        </p>
        <ul>
          <li>Receiving help through our customer support channels;</li>
        </ul>
        <ul>
          <li>Participation in customer surveys or contests; and</li>
        </ul>
        <ul>
          <li>
            Facilitation in the delivery of our Services and to respond to your
            inquiries.
          </li>
        </ul>
        <p>
          <strong>How do we use and share your personal information?</strong>
        </p>
        <p>&nbsp;</p>
        <p>
          More information about our data collection and sharing practices can
          be found in this privacy notice.
        </p>
        <p>&nbsp;</p>
        <p>
          You may contact us&nbsp;by email
          at&nbsp;admin@nesoacademy.org,&nbsp;or by referring to the contact
          details at the bottom of this document.
        </p>
        <p>&nbsp;</p>
        <p>
          If you are using an authorized agent to exercise your right to opt-out
          we may deny a request if the authorized agent does not submit proof
          that they have been validly authorized to act on your behalf.
        </p>
        <p>&nbsp;</p>
        <p>
          <strong>Will your information be shared with anyone else?</strong>
        </p>
        <p>&nbsp;</p>
        <p>
          We may disclose your personal information with our service providers
          pursuant to a written contract between us and each service provider.
          Each service provider is a for-profit entity that processes the
          information on our behalf.
        </p>
        <p>&nbsp;</p>
        <p>
          We may use your personal information for our own business purposes,
          such as for undertaking internal research for technological
          development and demonstration. This is not considered to be "selling"
          of your personal data.
        </p>
        <p>&nbsp;</p>
        <p>
          Neso Academy Private Limited&nbsp;has not disclosed or sold any
          personal information to third parties for a business or commercial
          purpose in the preceding 12 months.&nbsp;Neso Academy Private
          Limited&nbsp;will not sell personal information in the future
          belonging to website visitors, users and other consumers.
        </p>
        <p>&nbsp;</p>
        <p>
          <strong>Your rights with respect to your personal data</strong>
        </p>
        <p>&nbsp;</p>
        <p>
          <u>Right to request deletion of the data - Request to delete</u>
        </p>
        <p>&nbsp;</p>
        <p>
          You can ask for the deletion of your personal information. If you ask
          us to delete your personal information, we will respect your request
          and delete your personal information, subject to certain exceptions
          provided by law, such as (but not limited to) the exercise by another
          consumer of his or her right to free speech, our compliance
          requirements resulting from a legal obligation or any processing that
          may be required to protect against illegal activities.
        </p>
        <p>&nbsp;</p>
        <p>
          <u>Right to be informed - Request to know</u>
        </p>
        <p>&nbsp;</p>
        <p>Depending on the circumstances, you have a right to know:</p>
        <ul>
          <li>whether we collect and use your personal information;</li>
        </ul>
        <ul>
          <li>the categories of personal information that we collect;</li>
        </ul>
        <ul>
          <li>
            the purposes for which the collected personal information is used;
          </li>
        </ul>
        <ul>
          <li>whether we sell your personal information to third parties;</li>
        </ul>
        <ul>
          <li>
            the categories of personal information that we sold or disclosed for
            a business purpose;
          </li>
        </ul>
        <ul>
          <li>
            the categories of third parties to whom the personal information was
            sold or disclosed for a business purpose; and
          </li>
        </ul>
        <ul>
          <li>
            the business or commercial purpose for collecting or selling
            personal information.
          </li>
        </ul>
        <p>
          In accordance with applicable law, we are not obligated to provide or
          delete consumer information that is de-identified in response to a
          consumer request or to re-identify individual data to verify a
          consumer request.
        </p>
        <p>&nbsp;</p>
        <p>
          <u>
            Right to Non-Discrimination for the Exercise of a Consumer&rsquo;s
            Privacy Rights
          </u>
        </p>
        <p>&nbsp;</p>
        <p>
          We will not discriminate against you if you exercise your privacy
          rights.
        </p>
        <p>&nbsp;</p>
        <p>
          <u>Verification process</u>
        </p>
        <p>&nbsp;</p>
        <p>
          Upon receiving your request, we will need to verify your identity to
          determine you are the same person about whom we have the information
          in our system. These verification efforts require us to ask you to
          provide information so that we can match it with information you have
          previously provided us. For instance, depending on the type of request
          you submit, we may ask you to provide certain information so that we
          can match the information you provide with the information we already
          have on file, or we may contact you through a communication method
          (e.g. phone or email) that you have previously provided to us. We may
          also use other verification methods as the circumstances dictate.
        </p>
        <p>&nbsp;</p>
        <p>
          We will only use personal information provided in your request to
          verify your identity or authority to make the request. To the extent
          possible, we will avoid requesting additional information from you for
          the purposes of verification. If, however, we cannot verify your
          identity from the information already maintained by us, we may request
          that you provide additional information for the purposes of verifying
          your identity, and for security or fraud-prevention purposes. We will
          delete such additionally provided information as soon as we finish
          verifying you.
        </p>
        <p>&nbsp;</p>
        <p>
          <u>Other privacy rights</u>
        </p>
        <ul>
          <li>you may object to the processing of your personal data</li>
        </ul>
        <ul>
          <li>
            you may request correction of your personal data if it is incorrect
            or no longer relevant, or ask to restrict the processing of the data
          </li>
        </ul>
        <ul>
          <li>
            you can designate an authorized agent to make a request under the
            CCPA on your behalf. We may deny a request from an authorized agent
            that does not submit proof that they have been validly authorized to
            act on your behalf in accordance with the CCPA.
          </li>
        </ul>
        <ul>
          <li>
            you may request to opt-out from future selling of your personal
            information to third parties. Upon receiving a request to opt-out,
            we will act upon the request as soon as feasibly possible, but no
            later than 15 days from the date of the request submission.
          </li>
        </ul>
        <p>
          To exercise these rights, you can contact us&nbsp;by email
          at&nbsp;admin@nesoacademy.org,&nbsp;or by referring to the contact
          details at the bottom of this document. If you have a complaint about
          how we handle your data, we would like to hear from you.&nbsp;&nbsp;
        </p>
        <p>&nbsp;</p>
        <ol start="11">
          <li>
            <strong> DO WE MAKE UPDATES TO THIS NOTICE?</strong>&nbsp;
          </li>
        </ol>
        <p>&nbsp;</p>
        <p>
          <strong>
            <em>In Short:&nbsp;</em>
          </strong>
          <em>
            &nbsp;Yes, we will update this notice as necessary to stay compliant
            with relevant laws.
          </em>
        </p>
        <p>&nbsp;</p>
        <p>
          We may update this privacy notice from time to time. The updated
          version will be indicated by an updated "Revised" date and the updated
          version will be effective as soon as it is accessible. If we make
          material changes to this privacy notice, we may notify you either by
          prominently posting a notice of such changes or by directly sending
          you a notification. We encourage you to review this privacy notice
          frequently to be informed of how we are protecting your information.
        </p>
        <p>&nbsp;</p>
        <ol id="contact" start="12">
          <li>
            <strong> HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</strong>&nbsp;
          </li>
        </ol>
        <p>&nbsp;</p>
        <p>
          If you have questions or comments about this notice, you
          may&nbsp;email us at&nbsp;admin@nesoacademy.org&nbsp;or by post to:
        </p>
        <p>&nbsp;</p>
        <p>Neso Academy Private Limited</p>
        <p>
          S-019SF , SITE-4, KASNA GREATER NOIDA SHOPPING PLAZA , GREATER NOIDA
          Gautam Buddha Nagar UP 201308 IN
        </p>
        <p>GREATER NOIDA,&nbsp;UTTAR PRADESH&nbsp;201308</p>
        <p>India</p>
        <p>&nbsp;</p>
        <ol start="13">
          <li>
            <strong>
              {" "}
              HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM
              YOU?
            </strong>
            &nbsp;
          </li>
        </ol>
        <p>&nbsp;</p>
        <p>
          Based on the applicable laws of your country, you may have the right
          to request access to the personal information we collect from you,
          change that information, or delete it in some circumstances. To
          request to review, update, or delete your personal information,
          please&nbsp;visit:&nbsp;
          <a href="https://www.nesoacademy.org/support">Support Page</a> (as
          logged in user).
        </p>
        <p>&nbsp;</p>
      </div>
    </Container>
  );
};

export default PrivacyPolicy;
