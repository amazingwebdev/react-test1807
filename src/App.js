import 'tachyons'
import 'styling/semantic.less'

import React from 'react'
import MaskedInput from 'react-text-mask'
import _ from 'lodash'
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
  SearchResults
} from 'semantic-ui-react'
import './App.css';

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
    results: [],
    query: ''
  };

  handleResultSelect = (e, { result }) => this.setState({ address: result.title, query: result.title });

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, query: value, address: '' });

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

  render() {
    const {name, phone, address, isLoading, results, query} = this.state;

    return (
      <Container>
        <Header size='huge' style={{marginTop: 20, paddingLeft: 40, fontSize: 30}}>hyke</Header>
        <Divider />
        <Grid centered>
          <GridColumn largeScreen={10} mobile={14}>
            <Header style={{marginTop: 70, fontSize: '2.5rem', marginBottom: 30}}>Business information</Header>
            <Form>
              <FormField style={{marginBottom: 30}}>
                <Header as={'h3'}>Your business name</Header>
                <Input disabled value={name} />
              </FormField>
              <FormField style={{marginBottom: 30}}>
                <div>
                  <Header as={'h3'}>What's your business address?</Header>
                  <p>i.e your home address if you're working from home</p>
                </div>
                <Search
                  input={<input type={'text'} style={{fontSize: 16, borderLeftWidth: 0, borderRightWidth: 0, borderTopWidth: 0, marginTop: 15, color: 'blueviolet'}} />}
                  loading={isLoading}
                  onResultSelect={this.handleResultSelect}
                  onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
                  results={results}
                  value={query}
                  icon={<div />}
                  resultRenderer={({title}) => <div style={{width: '100%', height: '100%', paddingTop: 10, paddingBottom: 10}}>{title}</div>}
                 />
              </FormField>
              <FormField>
                <div>
                  <Header as={'h3'}>What's your business phone number?</Header>
                  <p>Enter your mobile number, if you don't have a  separate business phone number</p>
                </div>
                <Input
                  value={phone}
                  children={
                    <MaskedInput
                      mask={(mask) => {
                        this.setState({phone: mask.replace(/\D/g,'')});
                        return [ /[1-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
                      }}
                      style={{fontSize: 16, borderLeftWidth: 0, borderRightWidth: 0, borderTopWidth: 0, color: 'blueviolet', marginTop: 15}}
                    />
                  }
                />
              </FormField>
              <Grid style={{marginTop: 70}}>
                <GridColumn floated='left' mobile={16} tablet={8} widescreen={8} largeScreen={8} computer={8}>
                  <Button basic className={'footer-btn'}>Back</Button>
                </GridColumn>
                <GridColumn floated='right' mobile={16} tablet={8} widescreen={8} largeScreen={8} computer={8}
                            style={{display: 'flex', justifyContent: 'flex-end'}}>
                  <Button type='submit' className={'footer-btn'} disabled={!address || phone.length < 10}>
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

export default App
