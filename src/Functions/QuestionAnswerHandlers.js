import toast from 'react-hot-toast';

export const QuestionAnswerHandlers = ({
  questions,
  currentQuestionIndex,
  setCurrentQuestionIndex,
  setIsAnswerSelected,
  setIsAnswered,
  setNumCorrectAnswers,
  setNumIncorrectAnswers,
}) => {
  const handlePrevious = () => {
    setCurrentQuestionIndex(currentQuestionIndex - 1);
    setIsAnswerSelected(false);
    setIsAnswered(false);
  };

  const handleNext = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setIsAnswerSelected(false);
    setIsAnswered(false);
  };

  const handleAnswerSelect = answer => {
    setIsAnswerSelected(true);
    setIsAnswered(true);
    if (answer === questions[currentQuestionIndex].correct_answer) {
      setNumCorrectAnswers(prevNumCorrectAnswers => prevNumCorrectAnswers + 1);
      toast.success('Correct Answer!');
    } else {
      setNumIncorrectAnswers(
        prevNumIncorrectAnswers => prevNumIncorrectAnswers + 1
      );
      toast.error('Wrong Answer!');
    }
  };

  return {
    handlePrevious,
    handleNext,
    handleAnswerSelect,
  };
};
