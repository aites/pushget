import React, { Component } from 'react';

function Piece(char,num) {
    let charPiece = <img key={num} className={`char-piece char-piece__${char}`} key={char+num}></img>;
    return charPiece;
}

export default Piece;