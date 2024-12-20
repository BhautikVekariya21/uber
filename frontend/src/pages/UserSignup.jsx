import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserDataContext } from '../context/UserContext';

const UserSignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const navigate = useNavigate();
  const { setUser } = useContext(UserDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const newUser = {
        fullname: {
          firstname: firstName,
          lastname: lastName,
        },
        email,
        password,
      };
      const response = await axios.post('http://localhost:3001/api/users/register', newUser, {
        withCredentials: true,
      });
      console.log(response.data);
      setUser(response.data);
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="signup-container" style={{ margin: '20px' }}>
      <form onSubmit={submitHandler}>
        <h3 className="text-lg font-medium mb-2">Enter Email</h3>
        <input
          className="bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          type="email"
          placeholder="Email"
        />
        <h3 className="text-lg font-medium mb-2">Enter First Name</h3>
        <input
          className="bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          type="text"
          placeholder="First Name"
        />
        <h3 className="text-lg font-medium mb-2">Enter Last Name</h3>
        <input
          className="bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          type="text"
          placeholder="Last Name"
        />
        <h3 className="text-lg font-medium mb-2">Enter Password</h3>
        <input
          className="bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          type="password"
          placeholder="Password"
        />
        <button className="bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base">
          Create account
        </button>
      </form>
      <p className="text-center">
        Already have an account? <Link to="/login" className="text-blue-600">Login here</Link>
      </p>
      <div>
        <p className="text-[10px] leading-tight">
          This site is protected by reCAPTCHA and the <span className="underline">Google Privacy Policy</span> and{' '}
          <span className="underline">Terms of Service apply</span>.
        </p>
      </div>
    </div>
  );
};

export default UserSignup;
