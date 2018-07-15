import 'tachyons'
import 'styling/semantic.less'

import React from 'react'
import MaskedInput from 'react-text-mask'
import _ from 'lodash'
// import ReactGoogleMapLoader from "react-google-maps-loader"
// import PlacesAutocomplete, {
//   geocodeByAddress,
//   getLatLng,
// } from 'react-places-autocomplete';
import {
  Button,
  Header,
  Divider,
  Container,
  Form,
  Input,
  FormField,
  Grid,
  GridColumn,
  Search,
  Icon,
  Statistic,
  StatisticValue,
  Label,
  SearchResults
} from 'semantic-ui-react'

const mockData = [
  {'title': '221 1nd st. Sam Francisco, CA, 94105'},
  {'title': '222 2nd st. Sam Francisco, CA, 94105'},
  {'title': '223 3nd st. Sam Francisco, CA, 94105'},
  {'title': '224 4nd st. Sam Francisco, CA, 94105'},
  {'title': '225 5nd st. Sam Francisco, CA, 94105'},
  {'title': '226 6nd st. Sam Francisco, CA, 94105'},
  {'title': '227 7nd st. Sam Francisco, CA, 94105'}
];

class App extends React.Component {

  state = {
    address: '',
    name: 'Lee Cooper LLC.',
    phone: '',
    isLoading: false,
    results: []
  };

  handleResultSelect = (e, { result }) => this.setState({ address: result.title });

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, address: value });

    setTimeout(() => {
      if (!this.state.address) this.setState({isLoading: false});

      const re = new RegExp(_.escapeRegExp(this.state.address), 'i');
      const isMatch = result => re.test(result.title);

      this.setState({
        isLoading: false,
        results: _.filter(mockData, isMatch),
      })
    }, 300)
  };

  // handleChange = address => {
  //   this.setState({ address });
  // };
  //
  // handleSelect = address => {
  //   geocodeByAddress(address)
  //     .then(results => getLatLng(results[0]))
  //     .then(latLng => console.log('Success', latLng))
  //     .catch(error => console.error('Error', error));
  // };

  render() {
    const {name, phone, address, isLoading, results} = this.state;

    return (
      <Container>
        <Header size='huge'>hyke</Header>
        <Divider />
        <Grid>
          <GridColumn width={8} floated={'center'}>
            <Form>
              <FormField>
                <label>Your business name</label>
                <Input disabled value={name} />
              </FormField>
              <FormField>
                <div>
                  <label>What's your business address?</label>
                  <i>i.e your home address if you're working from home</i>
                </div>
                <Search
                  loading={isLoading}
                  onResultSelect={this.handleResultSelect}
                  onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
                  results={results}
                  value={address}
                  icon={<div />}
                  resultRenderer={({title}) => <div style={{width: '100%', height: '100%'}}>{title}</div>}
                  {...this.props}>
                  <SearchResults style={{backgroundColor: 'yellow'}}/>
                </Search>
                {/*<PlacesAutocomplete*/}
                  {/*value={address}*/}
                  {/*onChange={this.handleChange}*/}
                  {/*onSelect={this.handleSelect}*/}
                {/*>*/}
                  {/*{({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (*/}
                    {/*<div>*/}
                      {/*<Input*/}
                        {/*{...getInputProps({*/}
                          {/*placeholder: '',*/}
                          {/*className: 'location-search-input',*/}
                        {/*})}*/}
                      {/*/>*/}
                      {/*<div className="autocomplete-dropdown-container">*/}
                        {/*{loading && <div>Loading...</div>}*/}
                        {/*{suggestions.map(suggestion => {*/}
                          {/*const className = suggestion.active*/}
                            {/*? 'suggestion-item--active'*/}
                            {/*: 'suggestion-item';*/}
                          {/*// inline style for demonstration purpose*/}
                          {/*const style = suggestion.active*/}
                            {/*? { backgroundColor: '#fafafa', cursor: 'pointer' }*/}
                            {/*: { backgroundColor: '#ffffff', cursor: 'pointer' };*/}
                          {/*return (*/}
                            {/*<div*/}
                              {/*{...getSuggestionItemProps(suggestion, {*/}
                                {/*className,*/}
                                {/*style,*/}
                              {/*})}*/}
                            {/*>*/}
                              {/*<span>{suggestion.description}</span>*/}
                            {/*</div>*/}
                          {/*);*/}
                        {/*})}*/}
                      {/*</div>*/}
                    {/*</div>*/}
                  {/*)}*/}
                {/*</PlacesAutocomplete>*/}
              </FormField>
              <FormField>
                <div>
                  <label>What's your business phone number?</label>
                  <i>Enter your mobile number, if you don't have a  separate business phone number</i>
                </div>
                <Input
                  value={phone}
                  children={<MaskedInput mask={[ /[1-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]} />}
                />
              </FormField>
              <Grid>
                <GridColumn floated='left' width={4}>
                  <Button>Back</Button>
                </GridColumn>
                <GridColumn floated='right' width={4}>
                  <Button type='submit'>
                    <Statistic text size={'mini'} horizontal>
                      <StatisticValue text style={{display: 'flex', fontSize: 12}}>
                        Continue
                        <Icon name="long arrow right" />
                      </StatisticValue>
                    </Statistic>
                  </Button>
                </GridColumn>
              </Grid>
            </Form>
          </GridColumn>
        </Grid>
      </Container>
    )
  }
}
//
// const App = () =>
//   <ReactGoogleMapLoader
//     params={{
//       key: MAP_KEY, // Define your api key here
//       libraries: "places,geometry", // To request multiple libraries, separate them with a comma
//     }}
//     render={googleMaps => googleMaps && <Main/>}
//   />

export default App
