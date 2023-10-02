import React,{ Component } from 'react'
import errorimg from '../src/images/error404.png'
import { Link } from 'react-router-dom'
import Container from './components/Container';

class ErrorBoundary extends Component {
  constructor(props){
    super(props);
    this.state={hasError:false};
  }
  static getDeriviedStateFromError(error){
    return{hasError : true};
  }

  render(){
    if(this.state.hasError){
      return(
        <>
        <Container>
          <div>
          <img className='errorimg' src={errorimg}/>
          </div>
        </Container>
        </>
        
      );
    }
    return this.props.children;
  }
}
export default ErrorBoundary;

