import React from 'react'; 
import UserManagement from './UserManagement'; 
const Home = () => { return ( <div className="text-center ">  
<h2 className="text-2xl font-bold">Welcome to HostelDB</h2> 
<p className="mt-2">Find the best room for your stay</p> 
<div className="mt-8"> <UserManagement /> </div> </div> ); }; 
export default Home;