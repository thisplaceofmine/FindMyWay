import React, { useState, useEffect } from 'react';
import {
  useLoadScript,
  GoogleMap,
  Marker,
  InfoWindow
} from '@react-google-maps/api';
import { NavDropdown, Navbar, Nav } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty, remove } from 'lodash';

import { fetchQuery } from '../../actions';
import POIDataList from './data.json';

const Map = props => {
  //  Inital state setup
  const initalQuery = '';
  // '2cbe89f7-b959-4259-97c6-1610e7a2d9d1';
  const [query, setQuery] = useState(initalQuery);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [infoOpen, setinfoOpen] = useState(false);
  const [queryData, setQueryData] = useState({});
  const [userFavourite, setUserFavourite] = useState({"features": []});

  // Google map config
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API
  });

  // Extract data from Redux store
  const storedata = useSelector(state => ({ query: state.query }));

  //  Fetching data from external api by action
  const dispatch = useDispatch();
  useEffect(() => {
    if (query === initalQuery) {
      selectedPlace === null || setSelectedPlace(null);
      infoOpen === true || setinfoOpen(false);
      queryData === {} || setQueryData({});
      return;
    } else {
      dispatch(fetchQuery(query));
    }
  }, [query]);

  useEffect(() => {
    setQueryData(storedata.query);
  }, [storedata.query]);

  //  Rendering and mapping the Google Map Marker
  const renderPOIMarker = queryArray => {
    return queryArray.map((data, i) => {
      const position = {
        lat: data.geometry.coordinates[1],
        lng: data.geometry.coordinates[0]
      };
      return (
        <Marker
          onClick={() => {
            markerClickHandler(data);
          }}
          key={i}
          position={position}
        />
      );
    });
  };

  // Handling when the marker was clicked
  const markerClickHandler = data => {
    setSelectedPlace(data);
    if (infoOpen) {
      setinfoOpen(false);
    }
    setinfoOpen(true);
  };

  // Rendering Point of interest
  const renderPOI = datalist => {
    return (
      <Navbar bg='dark' variant='dark' id='Point of interest'>
        <Nav justify className='mr-auto '>
          <div className='collapse navbar-collapse'>
            {datalist.map((parentData, i) => {
              return (
                <NavDropdown
                  title={parentData.TypeNameEN}
                  id={parentData.TypeNameEN}
                  key={i}
                >
                  {parentData.Features.map((childData, i) => {
                    return (
                      <NavDropdown.Item
                        onClick={() => {
                          setQuery(childData.id);
                        }}
                        key={i}
                      >
                        {childData.NameEN}
                      </NavDropdown.Item>
                    );
                  })}
                </NavDropdown>
              );
            })}
          </div>
          <button
            type='button'
            className='btn btn-sm btn-outline-danger '
            onClick={() => {
              setQuery(initalQuery);
            }}
          >
            Reset
          </button>
        </Nav>
      </Navbar>
    );
  };

  // Help render the infoBox website field
  const websiteRenderHelper = website => {
    if (website === 'N.A.') {
      return website;
    } else {
      return (
        <a href={website} target='_blank'>
          {website}
        </a>
      );
    }
  };

  const renderUserFavourite = place => {
    const result = userFavourite.features.filter(data => {
      return data.properties['Facility Name'] === place.properties['Facility Name'];
    });
    const tempArray = [...userFavourite.features, place];
    const tempArray2 = remove([...userFavourite.features], data => {
      return data.properties['Facility Name'] === place.properties;
    });

    if (result.length === 0) {
      return (
        <ion-icon
          name='heart-outline'
          size='small'
          onClick={() => setUserFavourite({'features':tempArray})}
        />
      );
    } else {
      return <ion-icon name='heart' size='small' onClick={() => {setUserFavourite({'features':tempArray2})}} />;
    }
  };

  const renderMap = () => {
    return (
      <div className='container'>
        <h3 className='mx-auto  text-center my-2 '>Simple map</h3>
        <div><button className="btn" onClick={()=>{setQueryData(userFavourite)}}> Debug</button></div>
        <div>{renderPOI(POIDataList)}</div>
        <GoogleMap
          id='circle-example'
          mapContainerStyle={{
            height: '75vh',
            width: '100%'
          }}
          zoom={11}
          center={{ lat: 22.396427, lng: 114.109497 }}
        >
          {!isEmpty(queryData.features) && renderPOIMarker(queryData.features)}
          {infoOpen && selectedPlace && (
            <InfoWindow
              position={{
                lat: selectedPlace.geometry.coordinates[1],
                lng: selectedPlace.geometry.coordinates[0]
              }}
              onCloseClick={() => {
                setinfoOpen(false);
              }}
            >
              <div>
                <h6>
                  {selectedPlace.properties['Facility Name']}
                  {renderUserFavourite(selectedPlace)}
                </h6>
                <ul
                  style={{ listStyleType: 'none', paddingInlineStart: '5px' }}
                >
                  <li>Type: {selectedPlace.properties.Dataset}</li>
                  <li>Address: {selectedPlace.properties.Address}</li>
                  <li>Telephone: {selectedPlace.properties.Telephone}</li>
                  <li>
                    Webside:{' '}
                    {websiteRenderHelper(selectedPlace.properties.Website)}
                  </li>
                </ul>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </div>
    );
  };

  return isLoaded ? renderMap() : null;
};

export default Map;
