import { useNavigation } from 'react-router-dom';

const SubmitBtn = ({ text, extendClass }) => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <button
      type="submit"
      className={`btn btn-primary btn-block ${
        extendClass ? extendClass : null
      }`}
      disabled={isSubmitting}
    >
      {isSubmitting ? (
        <span className="loading loading-spinner">sending...</span>
      ) : (
        text || 'submit'
      )}
    </button>
  );
};

export default SubmitBtn;
