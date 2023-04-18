import { Toaster } from 'react-hot-toast';

export const Message = () => {
  return (
    <Toaster
      position="top-center"
      reverseOrder={false}
      toastOptions={{
        // className: '',
        duration: 2000,
        style: {
          border: '1px solid #aad1e2',
          background: '#3382ad',
          color: '#fff',
        },
      }}
    />
  );
};
