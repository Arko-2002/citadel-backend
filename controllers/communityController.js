import Community from '../models/communityModel.js';
import express from 'express';

export const createCommunity = async (req, res, next) => {
    try {
        const community = new Community({
            communityName: req.body.name,
            owner: req.userId,
            communityID: req.body.handle,
            subCategory: req.body.subcategory,
            communityDescription: req.body.description,
        });
        const result = await community.save();
        res.status(201).json(result);
    } catch (err) {
        res.status(401).send('Error');
    }
};

export const getCommunity = async (req, res) => {
    try {
        let id = req.params.id;

        // id = id.charAt(0).toUpperCase() + id.slice(1);

        const result = await Community.findOne({
            communityID: id,
        });
        res.status(201).json(result);
    } catch (err) {
        res.status(401).send(err.message);
    }
};

export const getAllCommunity = async (req, res) => {
    try {
        const result = await Community.find();
        res.status(201).json(result);
    } catch (err) {
        res.status(401).send(err.message);
    }
};
