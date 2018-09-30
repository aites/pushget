import React, { Component } from 'react';

function Piece(char,num) {
    let charPiece = <div key={num} className={`char-piece char-piece__${char}`} key={char+num}></div>;
    return charPiece;
}

export default Piece;