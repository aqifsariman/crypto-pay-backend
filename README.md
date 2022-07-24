# react-server

Template for React-Express Server Set up


Making HTTP Request from React:

// Client/src/App.js

useEffect( () => 
{

    fetch("/api")
		
      .then((res) => res.json())
			
      .then((data) => setData(data.message));
			
  }, [ ]);

