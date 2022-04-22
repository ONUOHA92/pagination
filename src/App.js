import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import Pagination from '@mui/material/Pagination';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import Stack from '@mui/material/Stack';
import Moment from 'react-moment';
import './styles/style.css'

function App() {
  const [fetchedData, setFetchedData] = useState([]);
  const [loading, setLoading] = useState(true)
  const [page, setpage] = useState(1)


  console.log(fetchedData);


  const handleChange = (page) => {
    setpage(page);
    window.scroll(0, 0)
  }


  useEffect(() => {
    const getData = async () => {
      const users = await axios.get(
        `https://swapi.dev/api/planets/?page=${page}`
      );
      console.log(users.data.count)
      setFetchedData(users.data.results);

      setTimeout(() => {
        setLoading(false)
      }, 5000);

    };
    getData();
  }, [page]);


  return (
    <div className="App">
      <h2 style={{ boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px', width: 250, padding: 20, display: 'flex', marginLeft: 20, marginTop: 50, marginBottom: 20 }}>Pagination with React</h2>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: "center", marginTop: 20 }}>
          <CircularProgress color="success" />
        </Box>
      ) : (

        <Table striped bordered hover size="sm" responsive>
          <thead>
            <tr>
              <th>s/n</th>
              <th>name</th>
              <th>orbital_period</th>
              <th>surface_water</th>
              <th>terrain</th>
              <th>date</th>
              <th>population</th>
            </tr>
          </thead>
          <tbody>

            {fetchedData.map((data, indx) => (
              <tr key={indx}>
                <td>{indx + 1}</td>
                <td>{data.name}</td>
                <td>{data.orbital_period}</td>
                <td>{data.surface_water}</td>
                <td>{data.terrain}</td>
                <td>
                  <Moment format="DD-MMM-YYYY">
                    {data.created}
                  </Moment>
                </td>
                <td>{data.population}</td>
              </tr>
            ))}
          </tbody>
        </Table>

      )}




      <Stack spacing={2} style={{ marginTop: 50 }}>
        <Pagination
          count={6}
          onChange={(e) => handleChange(e.target.textContent)}
          style={{ display: 'flex', justifyContent: 'center' }} />

      </Stack>

    </div>
  );
}

export default App;
