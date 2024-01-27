import { useDispatch, useSelector } from 'react-redux';
import CartContainer from './components/CartContainer';
import Modal from './components/Modal';
import Navbar from './components/Navbar';
import { getCartItems } from './features/cartSlice';
import { useEffect } from 'react';

function App() {
  const dispatch = useDispatch();
  const { isModalOpen } = useSelector((state) => state.modal);

  const { isLoading } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getCartItems());
  }, []);

  return (
    <main>
      <Navbar />
      {isLoading ? (
        <div className="loading">
          <h1>Loading...</h1>{' '}
        </div>
      ) : (
        <CartContainer />
      )}
      {isModalOpen ? <Modal /> : null}
    </main>
  );
}
export default App;
