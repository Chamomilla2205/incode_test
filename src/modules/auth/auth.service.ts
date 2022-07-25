import { Injectable } from "@nestjs/common";
import { RegistrationDto } from "./dto/registration.dto";
import { Password } from "src/shared/helpers/password";
import * as jwt from 'jsonwebtoken';
import { Response } from "express";
import { JwtPayloadDto } from "./dto/jwt-payload.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "src/shared/db/entities/user.entity";
import { Repository } from "typeorm";
import { Roles } from "src/shared/enums/roles.enum";

@Injectable()
export class Authservice {
  constructor(
    @InjectRepository(UserEntity) 
    private readonly userRepository: Repository<UserEntity>,
    ) {}

  async registerUser(credentials: RegistrationDto, res: Response): Promise<UserEntity> {
    try {
      const user = await this.userRepository.findOne({ where: {email: credentials.email}})
      
      if(user) {
        throw new Error('User already exists')
      }

      const password = await Password.toHash(credentials.password);
      credentials.password = password;

      const boss = await this.userRepository.findOne({ where: {id: credentials.bossId}});
      
      if(!boss) {
        throw new Error('This boss doesnt exist')
      }

      boss.role === Roles.Administrator 
        ? await this.userRepository.update(boss.id, boss)
        : await this.userRepository.update(boss.id, { role: Roles.Boss});
      
      const userObj = {
        email: credentials.email,
        password,
        boss,
        role: Roles.SimpleUser,
      }
      
      const newUser = await this.userRepository.save(userObj);
      
      const payload: JwtPayloadDto = {
        id: newUser.id,
        email: credentials.email
      }

      const token = jwt.sign(payload, 'asdf', { expiresIn: '2min' })
      
      res.cookie('jwt', token, { httpOnly: true });
      return newUser;
    } catch (err) {
      throw new Error(err.message)
    }
  }

  async login(credentials: RegistrationDto, res: Response) {
    try {
      const user = await this.userRepository.findOne({ where: {email: credentials.email}})

      if(!user) {
        throw new Error('Email or password is not valid');
      }

      const isPassCorrect = Password.compare(user.password, credentials.password);
  
      if(!isPassCorrect) {
        throw new Error('Email or password is not walid');
      }
  
      const payload: JwtPayloadDto = {
        id: user.id,
        email: credentials.email
      }
  
      const token = jwt.sign(payload, 'asdf', { expiresIn: 6*10 })
      
      res.cookie('jwt', token, { httpOnly: true });
    } catch (err) {
      throw new Error(err.message)
    }
  }
}