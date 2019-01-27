import React from 'react';
import '../styles/Flashcards.css';
import { Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';


let topNumber = 0;
let bottomNumber = 0;
let divisor = 0;
let dividend = 0;

class Flashcards extends React.Component {
  constructor(props) {
    super(props);
    
    this.toggle = this.toggle.bind(this);
    this.state = {
      problemTop: '',
      operation: '',
      bottomNumber: '',
      answer: '',
      correct: false,
      dropdownOpen: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({answer: Number(e.target.value)});
  }

  onKeyDown = (event) => {
    // 'keypress' event misbehaves on mobile so we track 'Enter' key via 'keydown' event
    if (event.key === 'Enter') {
      event.preventDefault();
      event.stopPropagation();
      this.checkAnswer();
    }
  }

  generateTop = (min, max) => {
    topNumber = Math.floor(Math.random() * (max - min) + min);
    this.setState({problemTop: topNumber});
  }

  generateBottom = (min, max) => {
    bottomNumber = Math.floor(Math.random() * (max - min) + min);
    this.setState({bottomNumber: bottomNumber});
  }

  generateDividend = (min, max) => {
    dividend = Math.floor(Math.random() * (max - min) + min);
    if(dividend < 10) {
      dividend = '0' + dividend
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
    this.setState({answer: '', correct: true})
    this.getProblem();
  }

  checkAddition = () => {
    if(this.state.problemTop + this.state.bottomNumber === this.state.answer){
      this.markCorrect()
    } else if(this.state.problemTop + this.state.bottomNumber !== this.state.answer) {
      this.setState({answer: '', correct: false})
    }
  }

  checkSubtraction = () => {
    if(this.state.problemTop - this.state.bottomNumber === this.state.answer){
      this.markCorrect()
    } else if(this.state.problemTop - this.state.bottomNumber !== this.state.answer) {
      this.setState({answer: '', correct: false})
    }
  }

  checkMultiplication = () => {
    if(this.state.problemTop * this.state.bottomNumber === this.state.answer){
      this.markCorrect()
    } else if(this.state.problemTop * this.state.bottomNumber !== this.state.answer) {
      this.setState({answer: '', correct: false})
    }
  }

  checkDivision = () => {
    if(this.state.problemTop / this.state.bottomNumber === this.state.answer){
      this.markCorrect()
    } else if(this.state.problemTop / this.state.bottomNumber !== this.state.answer) {
      this.setState({answer: '', correct: false})
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
      <div>
        <h1 id="h1">Practice Math!</h1>
        <div className={this.state.correct ? "green" : "red"}>
          <div id="problemTop">{this.state.problemTop}</div>
          <div id="operation">{this.state.operation}</div>
          <div id="bottomNumber">{this.state.bottomNumber}</div>
        </div>
          <div id="problemAnswer">
            <input type="text" id="answerBox" onChange={this.handleChange} onKeyDown={this.onKeyDown} value={this.state.answer}/>
          </div>
          <Button id="newProblem" type="submit" outline color="primary" onClick={this.getProblem}>New Problem</Button>{' '}
          <Button id="newProblem" outline color="danger" onClick={this.checkAnswer}>Check Answer</Button>{' '}
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
      </div>
    )
  }
}

export default Flashcards