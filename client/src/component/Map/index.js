import React, { useState, useEffect } from 'react';
import {
  useLoadScript,
  GoogleMap,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';
import {
  NavDropdown,
  Navbar,
  Nav,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from 'lodash';

import { fetchQuery, updateUserFav } from '../../actions';
import POIDataList from './data.json';

const Map = () => {
  //  Inital state setup
  const initalQuery = '';
  const [query, setQuery] = useState(initalQuery);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [infoOpen, setinfoOpen] = useState(false);
  const [queryData, setQueryData] = useState({});
  const [userFavourite, setUserFavourite] = useState({ features: [] });

  // Google map config
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API,
  });

  // Extract data from Redux store
  const storedata = useSelector((state) => ({
    query: state.query,
    user: state.user,
    token: state.token,
  }));

  //  Fetching data from external api by action
  const dispatch = useDispatch();
  useEffect(() => {
    if (query === initalQuery) {
      return;
    } else {
      dispatch(fetchQuery(query));
    }
    // eslint-disable-next-line
  }, [query]);

  useEffect(() => {
    setQueryData(storedata.query);
  }, [storedata.query]);

  useEffect(() => {
    if (!storedata.user || storedata.user.pinlist === userFavourite.features) {
      return;
    } else {
      setUserFavourite({ features: storedata.user.pinlist });
    }
    // eslint-disable-next-line
  }, [storedata.user]);

  //  Rendering and mapping the Google Map Marker
  const renderPOIMarker = (queryArray) => {
    return queryArray.map((data, i) => {
      const position = {
        lat: data.geometry.coordinates[1],
        lng: data.geometry.coordinates[0],
      };
      return (
        <Marker
          onClick={() => {
            setSelectedPlace(data);
            if (infoOpen) {
              setinfoOpen(false);
            }
            setinfoOpen(true);
          }}
          key={i}
          position={position}
        />
      );
    });
  };

  // Rendering Point of interest
  const renderPOI = (datalist) => {
    return (
      <Navbar bg='dark' variant='dark' id='Point of interest' >
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
          <div className='btn-group' role='Toolbar button group'>
            <button
              className='btn btn-sm btn-outline-light'
              onClick={() => {
                setQueryData(userFavourite);
              }}
            >
              {' '}
              My favourite
            </button>
            <button
              type='button'
              className='btn btn-sm btn-outline-danger '
              onClick={() => {
                setQuery(initalQuery);
              }}
            >
              Reset
            </button>
          </div>
        </Nav>
      </Navbar>
    );
  };

  // Help render the infoBox website field
  const websiteRenderHelper = (website) => {
    if (website === 'N.A.') {
      return website;
    } else {
      return (
        <a href={website} target='_blank' rel='noopener noreferrer'>
          {website}
        </a>
      );
    }
  };

  const renderUserFavourite = (place) => {
    if (!storedata.user) {
      return (
        <OverlayTrigger
          placement='bottom'
          delay={{ show: 150, hide: 500 }}
          overlay={(props) => {
            return (
              <Tooltip id='Favourite-Popup' {...props}>
                You must login to save favourite.
              </Tooltip>
            );
          }}
        >
          <ion-icon name='heart-outline' size='small' />
        </OverlayTrigger>
      );
    } else {
      const result = userFavourite.features.filter((data) => {
        return (
          data.properties['Facility Name'] === place.properties['Facility Name']
        );
      });

      if (result.length === 0) {
        const tempArray = [...userFavourite.features, place];
        return (
          <ion-icon
            name='heart-outline'
            size='small'
            onClick={() =>
              dispatch(updateUserFav(tempArray, storedata.token, '/maps'))
            }
          />
        );
      } else {
        const tempArray2 = userFavourite.features.filter((data) => {
          return (
            data.properties['Facility Name'] !==
            place.properties['Facility Name']
          );
        });
        return (
          <ion-icon
            name='heart'
            size='small'
            onClick={() => {
              dispatch(updateUserFav(tempArray2, storedata.token, '/maps'));
            }}
          />
        );
      }
    }
  };

  const renderMap = () => {
    return (
      <div className='container'>
        <h3 className='mx-auto  text-center my-2 '>Simple map</h3>
        <div>
          {/* <button
            className='btn btm-sm'
            onClick={() => {
              console.log(userFavourite);
            }}
          >
            Debug
          </button> */}
        </div>
        <div>{renderPOI(POIDataList)}</div>
        <GoogleMap
          id='circle-example'
          mapContainerStyle={{
            height: '75vh',
            width: '100%',
          }}
          zoom={11}
          center={{ lat: 22.396427, lng: 114.109497 }}
          onClick={() => setinfoOpen(false)}
        >
          {!isEmpty(queryData.features) && renderPOIMarker(queryData.features)}
          {infoOpen && selectedPlace && (
            <InfoWindow
              position={{
                lat: selectedPlace.geometry.coordinates[1],
                lng: selectedPlace.geometry.coordinates[0],
              }}
              onCloseClick={() => {
                setinfoOpen(false);
              }}
            >
              <div>
                <h6>
                  {selectedPlace.properties['Facility Name']}{' '}
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
