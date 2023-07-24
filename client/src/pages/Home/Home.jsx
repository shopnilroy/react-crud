import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
const Home = () => {
  const navigate = useNavigate()
  const [apidata, SetApiData] = useState('')
  const [currentUser, SetCurrentUser] = useState('')
  // https://mocki.io/v1/51f74fa5-3db6-401b-b524-7d2a214548ed
  // https://jsonplaceholder.typicode.com/users


  //   useEffect(() => {
  //     fetch('https://mocki.io/v1/51f74fa5-3db6-401b-b524-7d2a214548ed')
  //         .then(res => res.json())
  //         .then(data => {
  //           SetApiData(data);
  //         });
  // }, [])
  // console.log(apidata);

  useEffect(() => {
    fetch('http://localhost:5000/')
      .then(res => res.json())
      .then(data => {
        SetCurrentUser(data);
       
      });
  }, [])

  // useEffect(() => {
   
  //     fetch('http://localhost:5000/', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify(apidata),
  //     })
  //       .then((res) => res.json())
  //       .then((result) => {
  //         console.log(result);
  //       })
  //       .catch((error) => {
  //         console.log('Error sending data to the backend.', error);
  //       });
  //   // }
  // }, []); 
 

  const handleDelete = (_id) => {
    console.log(_id);
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/${_id}`, {
          method: "DELETE"
        })
          .then(res => res.json())
         
          .then(data => {
            console.log(data);
            if (data.deletedCount > 0) {
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
            }
            navigate('/')

          });
      }
    })

  }
  return (
    <>
      <Link to='/add'>
        <div className='flex items-center justify-center mt-10'>
          <p>Add user+</p>
        </div>
      </Link>

      <div className='flex items-center justify-center mt-10'>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Update Action</th>
                <th>Delete Action</th>

              </tr>
            </thead>
            <tbody>
              {currentUser ? (
                currentUser.map((item) => (
                  // Your mapping logic here
                  <tr key={item._id}>
                    <th>{item._id}</th>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>
                      <Link to={`/update/${item._id}`}>
                        <button className='btn-sm btn-primary'>Update</button>
                      </Link>

                    </td>
                    <td>
                      <Link to=''>
                        <button onClick={() => handleDelete(item._id)} className='btn-sm btn-warning'>Delete</button>
                      </Link>

                    </td>
                  </tr>

                ))
              ) : (
                <tr>No data available</tr>
              )}

            </tbody>
          </table>
        </div>
      </div>

    </>
  );
};

export default Home;