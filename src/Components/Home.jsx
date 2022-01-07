import React, {useState, useEffect} from "react"
import {
    Link,
    Page, 
    Card, 
    ResourceList, 
    Avatar, 
    ResourceItem, 
    TextStyle, 
    Navigation, 
    Heading
  } from "@shopify/polaris";
import {useSelector} from 'react-redux';
import { useNavigate } from "react-router";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import Geocode from "react-geocode";

const Home = () => {
    const navigate = useNavigate();
    const users = useSelector(state => state.users.list)
    const [lat, setLat] = useState("");
    const [lng, setLng] = useState("");
    
    Geocode.setApiKey(process.env.REACT_APP_URL_GEOCODE_API_KEY)
    
    
    useEffect(() => {
            if (users.length !== 0) {
            Geocode.fromAddress(users[0].address).then(
            (response) => {
              const { lat, lng } = response.results[0].geometry.location;
              setLat(lat);
              setLng(lng);
            },
            (error) => {
              console.log(error);
            }
          ) 
        }
    }, [])

  const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={16}
    defaultCenter={{ lat: lat, lng: lng }}
  >
   <Marker
    position={{ lat: lat, lng: lng }}
   />
  </GoogleMap>
))
    
    return (
        <div>
            {users.length === 0 ?
            <Page
            title="Home">
            <Navigation exact location="/">
                <Navigation.Section
                    items={[
                    {
                        url: '/',
                        label: 'Home'         
                    },
                    {
                        url: '/register',
                        label: 'Register'         
                    }
                    ]}
                />
            </Navigation>
            <Heading
                size="large">
                Welcome. Click <Link url='/register'>here</Link> to register.
            </Heading>
            </Page>
            :
            <Page
            title="Home">
            <Navigation exact location="/">
                <Navigation.Section
                    items={[
                    {
                        url: '/',
                        label: 'Home'          
                    },
                    {
                        url: '/register',
                        label: 'Register'          
                    }
                    ]}
                />
            </Navigation>
            <Heading
                size="extraLarge"
            >
            Welcome. You will see registered users here.
            </Heading>
                <Card>
                    <ResourceList
                    resourceName={{singular: 'customer', plural: 'customers'}}
                    items={users}
                    renderItem={(item) => {
                        const {firstName, lastName, email, address, phone} = item;
                        const media = <Avatar customer size="medium" name={firstName} />;
                
                        return (
                        <ResourceItem>
                            <h3>
                            <TextStyle variation="strong">{firstName}</TextStyle>
                            </h3>
                            <div>{address} (as shown below)</div>
                            <MyMapComponent
                                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyB-Fq_in6YaopXEqcM2XSZ3rHotk49SEPk"
                                loadingElement={<div style={{ height: `100%` }} />}
                                containerElement={<div style={{ height: `400px` }} />}
                                mapElement={<div style={{ height: `100%` }} />}
                            />
                        </ResourceItem>
                        );
                    }}
                    />
                </Card>
            </Page>
            }
        </div>
    )
}

export default Home;
