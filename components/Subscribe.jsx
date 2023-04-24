
import MailchimpSubscribe from 'react-mailchimp-subscribe';
import NewsletterForm from './NewsletterForm';

const Subscribe = () => (
  <MailchimpSubscribe
    url={process.env.NEXT_PUBLIC_MAILCHIMP_URL}
    render={({ subscribe, status, message }) => (
      <div className="flexBetween md:w-full minlg:w-557 w-357 mt-6 dark:bg-nft-black-2 bg-white border dark:border-nft-black-2 border-nft-gray-2 rounded-md">
        <NewsletterForm status={status} message={message} onValidated={(formData) => subscribe(formData)} />
      </div>
    )}
  />
);

export default Subscribe;
