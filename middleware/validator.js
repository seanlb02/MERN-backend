import express from 'express';


export default function validator(err, req, res, next) {
    if (err.type = ValidationError)
    {res.status(409).send({"error" : "username is already taken"})}
    else 
    {res.status(500).send('Something broke!')}

}