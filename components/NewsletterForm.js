import { useState } from 'react';
import { decode } from 'html-entities';

const NewsletterForm = ({ status, message, onValidated }) => {
  const [error, setError] = useState(null);
  const [email, setEmail] = useState(null);

  /**
   * Handle form submit.
   *
   * @return {{value}|*|boolean|null}
   */
  const handleFormSubmit = () => {
    setError(null);

    if (!email) {
      setError('Please enter a valid email address');
      return null;
    }

    const isFormValidated = onValidated({ EMAIL: email });

    // On success return true
    return email && email.indexOf('@') > -1 && isFormValidated;
  };

  /**
   * Handle Input Key Event.
   *
   * @param event
   */
  const handleInputKeyEvent = (event) => {
    setError(null);
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      handleFormSubmit();
    }
  };

  /**
   * Extract message from string.
   *
   * @param {String} message
   * @return {null|*}
   */
  const getMessage = (messages) => {
    if (!messages) {
      return null;
    }
    const result = messages?.split('-') ?? null;
    if (result?.[0]?.trim() !== '0') {
      return decode(messages);
    }
    const formattedMessage = result?.[1]?.trim() ?? null;
    return formattedMessage ? decode(formattedMessage) : null;
  };

  return (
    <div className="w-full">
      <div className="flex w-full bg-dark justify-between">
        <div className="flexBetween md:w-full minlg:w-557 w-357 h-full dark:bg-nft-black-2 bg-white border dark:border-nft-black-2 border-nft-gray-2 rounded-md">
          <input
            onChange={(event) => setEmail(event?.target?.value ?? '')}
            type="email"
            placeholder="Your email"
            className="h-full flex-1 w-full p-3 dark:bg-nft-black-2 bg-white px-4 rounded-md font-poppins dark:text-white text-nft-black-1 font-normal text-xs minlg:text-lg outline-none"
            onKeyUp={(event) => handleInputKeyEvent(event)}
          />
        </div>
        <div className="flex flex-end justify-end h-full">
          <button type="button" className="nft-gradient h-full text-sm minlg:text-lg py-3 px-6 minlg:py-4 minlg:px-8 font-poppins font-semibold text-white rounded-md" onClick={handleFormSubmit}>
            Subscribe
          </button>
        </div>
      </div>

      <div className="newsletter-form-info w-full relative -bottom-5">
        {status === 'sending' && <div>Sending...</div>}
        {status === 'error' || error ? (
          <div
            className="bg-danger"
            dangerouslySetInnerHTML={{ __html: error || getMessage(message) }}
          />
        ) : null }
        {status === 'success' && status !== 'error' && !error && (
          <div dangerouslySetInnerHTML={{ __html: decode(message) }} />
        )}
      </div>
    </div>
  );
};

export default NewsletterForm;
