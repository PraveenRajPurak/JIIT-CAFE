// fetchApi.mjs
export const fetchUserDetails = async (userData) => {

  console.log('Fetching user details:', userData);
  const token = userData.token;
  console.log('Token:', token);
  try {
    if (!token) {
      // Token not found, handle as needed (e.g., redirect to login)
      return null;
    }

    const response = await fetch('http://192.168.177.64:3000/user/details', {
      method: 'GET',
      headers: {
        'Authorization' : `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    console.log('API Response:', response);

    console.log('API Response:', response.status); // Log the response status

    if (response.ok) {
      const userDetails = await response.json();
      console.log('User Details:', userDetails); // Log the user details
      return userDetails;
    } else {
      // Handle error response from the server
      console.log('Error from server 404');
    }
  } catch (error) {
    console.error('Error fetching user details:', error);
    // Handle other errors as needed
    return null;
  }
};

