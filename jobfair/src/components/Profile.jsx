import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('http://localhost:3004/profileuser', {
          method: 'GET',
          headers: {
            'x-auth-token': localStorage.getItem('authToken'), // Include token in header
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }

        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Error fetching profile:', error);
        // Optionally, redirect to login or handle unauthorized access
        navigate('/user');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>No user data</div>;
  }

  return (
    <div>
      <br /><br /><br />
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          sx={{ 
            height: 140, 
            width: 140, 
            borderRadius: '50%', 
            objectFit: 'cover',
            margin: 'auto'
          }}
          image={profileData?.image || "https://via.placeholder.com/140"} // Default image if none exists
          title={profileData?.name || "User Image"}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {profileData?.name || "User Name"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            City: {profileData?.city || "N/A"}
            <br />
            District: {profileData?.district || "N/A"}
            <br />
            Qualification: {profileData?.qualification || "N/A"}
            <br />
            Age: {profileData?.age || "N/A"}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </div>
  );
}

export default Profile;