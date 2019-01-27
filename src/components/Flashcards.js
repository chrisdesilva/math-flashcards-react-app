import React from 'react';
import '../styles/Flashcards.css';
import { Button, Col, Container, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Row } from 'reactstrap';

let topNumber = 0;
let bottomNumber = 0;
let dividend = Math.floor(Math.random() * 144);
let divisor = 1;

class Flashcards extends React.Component {
  constructor(props) {
    super(props);
    
    this.toggle = this.toggle.bind(this);
    this.state = {
      problemTop: '',
      operation: '',
      bottomNumber: '',
      answer: '',
      numCorrect: 0,
      total: 0,
      correct: false,
      dropdownOpen: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
  }
  //used for dropdown menu of operations
  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }
  //track changes in answer box
  handleChange(e) {
    e.preventDefault();
    this.setState({answer: Number(e.target.value)});
  }
  //allow checkAnswer on enter key
  onKeyDown = (event) => {
    // 'keypress' event misbehaves on mobile so we track 'Enter' key via 'keydown' event
    if (event.key === 'Enter') {
      event.preventDefault();
      event.stopPropagation();
      this.checkAnswer();
    }
  }
  //make top and bottom numbers for +, -, and x problems
  generateTop = (min, max) => {
    topNumber = Math.floor(Math.random() * (max - min) + min);
    if(topNumber < 10){
      topNumber = "0" + topNumber;
    };
    this.setState({problemTop: topNumber});
  }

  generateBottom = (min, max) => {
    bottomNumber = Math.floor(Math.random() * (max - min) + min);
    if(bottomNumber < 10){
      bottomNumber = "0" + bottomNumber;
    };
    this.setState({bottomNumber: bottomNumber});
  }
  //make top and bottom numbers for division problems
  generateDividend = (min, max) => {
    dividend = Math.floor(Math.random() * (max - min) + min);
    if(dividend < 10) {
      dividend = "0" + dividend
    }
    this.setState({problemTop: dividend})
  }

  generateDivisor = (min, max) => {
    divisor = Math.floor(Math.random() * (max - min) + min);
    if(divisor < 10){
        divisor = "0" + divisor;
    }
    if(dividend % divisor){
        this.generateDivisor(min, max);
    }
    this.setState({bottomNumber: divisor})
  }
  //make problems based on operation choice
  addition = () => {
    this.generateTop(0, 100);
    this.generateBottom(0, 100);
    this.setState({operation: '+'});
  }

  subtraction = () => {
    this.generateTop(0, 100);
    this.generateBottom(0, topNumber);
    this.setState({operation: '-'});
  }

  multiplication = () => {
    this.generateTop(0, 12);
    this.generateBottom(0, 12);
    this.setState({operation: 'x'})
  }

  division = () => {
    this.generateDividend(1, divisor * 12);
    this.generateDivisor(1, 12);
    this.setState({operation: '÷'})
  }
  //refresh component so new problem appears
  getProblem = () => {
    switch(this.state.operation){
      default: 
        this.addition();
        break;
      case '+':
        this.addition();
        break;
      case '-':
        this.subtraction();
        break;
      case 'x':
        this.multiplication();
        break;
      case '÷':
        this.division();
        break;
    }
  }

  markCorrect = () => {
    this.setState(
      {
        answer: '', 
        numCorrect: this.state.numCorrect + 1, 
        total: this.state.total + 1, 
        correct: true
      });
    this.getProblem();
  }
  //check if answers are correct
  checkAddition = () => {
    if(Number(this.state.problemTop) + Number(this.state.bottomNumber) === Number(this.state.answer)){
      this.markCorrect()
    } else if(Number(this.state.problemTop) + Number(this.state.bottomNumber) !== Number(this.state.answer)) {
      this.setState(
        {
          answer: '', 
          total: this.state.total + 1, 
          correct: false
        });
    }
  }

  checkSubtraction = () => {
    if(Number(this.state.problemTop) - Number(this.state.bottomNumber) === Number(this.state.answer)){
      this.markCorrect()
    } else if(Number(this.state.problemTop) - Number(this.state.bottomNumber) !== Number(this.state.answer)) {
      this.setState(
        {
          answer: '', 
          total: this.state.total + 1, 
          correct: false
        });
    }
  }

  checkMultiplication = () => {
    if(Number(this.state.problemTop) * Number(this.state.bottomNumber) === Number(this.state.answer)){
      this.markCorrect()
    } else if(Number(this.state.problemTop) * Number(this.state.bottomNumber) !== Number(this.state.answer)) {
      this.setState(
        {
          answer: '', 
          total: this.state.total + 1, 
          correct: false
        });
    }
  }

  checkDivision = () => {
    if(Number(this.state.problemTop) / Number(this.state.bottomNumber) === Number(this.state.answer)){
      this.markCorrect()
    } else if(Number(this.state.problemTop) / Number(this.state.bottomNumber) !== Number(this.state.answer)) {
      this.setState(
        {answer: '', 
        total: this.state.total + 1, 
        correct: false
      });
    }
  }

  checkAnswer() {
    switch(this.state.operation){
      default: 
        this.checkAddition();
        break;
      case '+':
        this.checkAddition();
        break;
      case '-':
        this.checkSubtraction();
        break;
      case 'x':
        this.checkMultiplication();
        break;
      case '÷': 
        this.checkDivision();
        break;
    }
  }

  render(){
    return (
      <Container>
        <h1 id="h1">Practice Math!</h1>
        <Row className={this.state.correct ? "green" : "red"}>
          <Col id="problemTop">{this.state.problemTop}</Col>
        </Row>
        <Row className={this.state.correct ? "green" : "red"}>
          <Col id="bottomNumber">{this.state.operation}{this.state.bottomNumber}</Col>
        </Row>
          <div id="problemAnswer">
            <input type="text" id="answerBox" onChange={this.handleChange} onKeyDown={this.onKeyDown} value={this.state.answer}/>
          </div>
          <Button id="newProblem" type="submit" outline color="primary" onClick={this.getProblem}>New Problem</Button>{' '}
          <Button id="newProblem" outline color="success" onClick={this.checkAnswer}>Check Answer</Button>{' '}
          <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} >
            <DropdownToggle outline color="warning" caret>
              Operations
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={this.addition}>Addition</DropdownItem>
              <DropdownItem onClick={this.subtraction}>Subtraction</DropdownItem>
              <DropdownItem onClick={this.multiplication}>Multiplication</DropdownItem>
              <DropdownItem onClick={this.division}>Division</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <div id="accuracy">
          {this.state.total > 0 && <p>Accuracy: {Math.floor((this.state.numCorrect / this.state.total) * 100)}% </p>}
          </div>
      </Container>
    )
  }
}

export default Flashcards