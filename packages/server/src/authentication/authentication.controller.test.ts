/* eslint-disable @typescript-eslint/no-explicit-any */

import mongoose from 'mongoose';
import request from 'supertest';
import bcrypt from 'bcrypt';
import { classToPlain } from 'class-transformer';
import App from '../app';
import CreateUserDto from '../user/user.dto';
import AuthenticationController from './authentication.controller';
import LogInDto from './logIn.dto';
import WrongCredentialsException from '../exceptions/WrongCredentialsException';
import HttpException from '../exceptions/HttpException';

describe('The AuthenticationController', () => {
    describe('POST /auth/register', () => {
        describe('if the email is not taken', () => {
            it('response should have the Set-Cookie header with the Authorization token', () => {
                const userData: CreateUserDto = {
                    email: 'john@smith.com',
                    password: 'strongPassword123'
                };
                process.env.JWT_SECRET = 'jwt_secret';
                const authenticationController = new AuthenticationController();
                authenticationController.authenticationService.user.findOne = jest.fn().mockReturnValue(Promise.resolve(undefined));
                authenticationController.authenticationService.user.create = jest.fn().mockReturnValue({
                    ...userData,
                    _id: 0
                });
                (mongoose as any).connect = jest.fn();
                const app = new App([
                    authenticationController
                ]);
                return request(app.getServer())
                    .post(`${authenticationController.path}/register`)
                    .send(userData)
                    .expect(200)
                    .expect('Content-Type', /json/)
                    .expect('Set-Cookie', /^Authorization=.+/);
            });
        });
        describe('if an exception occurs', () => {
            it('it responds with an error', () => {
                const userData: CreateUserDto = {
                    email: 'john@smith.com',
                    password: 'strongPassword123'
                };
                process.env.JWT_SECRET = 'jwt_secret';
                const triggeredError = new HttpException(400, 'Unplanned error');
                const authenticationController = new AuthenticationController();
                authenticationController.authenticationService.register = jest.fn(() => { throw triggeredError; });
                (mongoose as any).connect = jest.fn();
                const app = new App([
                    authenticationController
                ]);
                return request(app.getServer())
                    .post(`${authenticationController.path}/register`)
                    .send(userData)
                    .expect(400)
                    .expect('Content-Type', /json/)
                    .then(res => {
                        expect(res.body).toMatchObject(classToPlain(triggeredError));
                    });
            });
        });
    });
    describe('POST /auth/login', () => {
        describe('if the password is correct', () => {
            it('it should successfully log in', async () => {
                const logInData: LogInDto = {
                    email: 'john@smith.com',
                    password: 'strongPassword123'
                };
                process.env.JWT_SECRET = 'jwt_secret';
                const hashedPassword = await bcrypt.hash(logInData.password, 10);
                const authenticationController = new AuthenticationController();
                authenticationController.authenticationService.user.findOne = jest.fn().mockReturnValue(Promise.resolve({
                    email: 'john@smith.com',
                    password: hashedPassword
                }));
                (mongoose as any).connect = jest.fn();
                const app = new App([
                    authenticationController
                ]);
                return request(app.getServer())
                    .post(`${authenticationController.path}/login`)
                    .send(logInData)
                    .expect(200)
                    .expect('Content-Type', /json/)
                    .expect('Set-Cookie', /^Authorization=.+/);
            });
        });
        describe('if the password is incorrect', () => {
            it('it should throw an error', async () => {
                const logInData: LogInDto = {
                    email: 'john@smith.com',
                    password: 'strongPassword123'
                };
                process.env.JWT_SECRET = 'jwt_secret';
                const hashedPassword = await bcrypt.hash('originalPassword123', 10);
                const authenticationController = new AuthenticationController();
                authenticationController.authenticationService.user.findOne = jest.fn().mockReturnValue(Promise.resolve({
                    email: 'john@smith.com',
                    password: hashedPassword
                }));
                (mongoose as any).connect = jest.fn();
                const app = new App([
                    authenticationController
                ]);
                return request(app.getServer())
                    .post(`${authenticationController.path}/login`)
                    .send(logInData)
                    .expect(401)
                    .expect('Content-Type', /json/)
                    .then(res => {
                        expect(res.body).toMatchObject(classToPlain(new WrongCredentialsException()));
                    });
            });
        });
        describe('if the user does not exist', () => {
            it('it should throw an error', async () => {
                const logInData: LogInDto = {
                    email: 'john@smith.com',
                    password: 'strongPassword123'
                };
                process.env.JWT_SECRET = 'jwt_secret';
                const authenticationController = new AuthenticationController();
                authenticationController.authenticationService.user.findOne = jest.fn().mockReturnValue(Promise.resolve(undefined));
                (mongoose as any).connect = jest.fn();
                const app = new App([
                    authenticationController
                ]);
                return request(app.getServer())
                    .post(`${authenticationController.path}/login`)
                    .send(logInData)
                    .expect(401)
                    .expect('Content-Type', /json/)
                    .then(res => {
                        expect(res.body).toMatchObject(classToPlain(new WrongCredentialsException()));
                    });
            });
        });
        describe('if there are missing arguments', () => {
            it('it should throw an error', async () => {
                const logInData = {
                    email: 'john@smith.com'
                };
                process.env.JWT_SECRET = 'jwt_secret';
                const authenticationController = new AuthenticationController();
                (mongoose as any).connect = jest.fn();
                const app = new App([
                    authenticationController
                ]);
                return request(app.getServer())
                    .post(`${authenticationController.path}/login`)
                    .send(logInData)
                    .expect(400)
                    .expect('Content-Type', /json/)
                    .then(res => {
                        expect(res.body.message).toBe('password must be a string');
                    });
            });
        });
    });
    describe('POST /auth/logout', () => {
        it('it should successfully log out', async () => {
            process.env.JWT_SECRET = 'jwt_secret';
            const authenticationController = new AuthenticationController();
            (mongoose as any).connect = jest.fn();
            const app = new App([
                authenticationController
            ]);
            return request(app.getServer())
                .post(`${authenticationController.path}/logout`)
                .expect(200)
                .expect('Set-Cookie', /^Authorization=;.*/);
        });
    });
});
