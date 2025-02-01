import express from 'express'
import type {Request, Response} from "express";
import {validateRequest, BadRequestError} from '@dxtickets/common'
import {body} from "express-validator";
import {User} from '../models/user'
import {Password} from "../lib/password";
import jwt from 'jsonwebtoken'

const router = express.Router()

router.post('/api/users/signin',
	[
		body('email')
			.isEmail()
			.withMessage('Email must be valid'),
		body('password')
			.trim()
			.notEmpty()
			.withMessage('You must supple a password')
	],
	validateRequest,
	async (req: Request, res: Response) => {
		const {email, password} = req.body
		
		const existingUser = await User.findOne({email})
		if (!existingUser) {
			throw new BadRequestError('Invalid credentials')
		}
		
		const passwordsMatch = await Password.compare(existingUser.password, password)
		if (!passwordsMatch) {
			throw new BadRequestError('Invalid credentials')
		}
		
		// Generate JWT
		const userJwt = jwt.sign({
				id: existingUser.id,
				email: existingUser.email
			},
			process.env.JWT_KEY!
		)
		
		// Store it one session object
		req.session = {
			jwt: userJwt
		}
		
		res.send(existingUser)
		
	})

export {router as signinRouter}