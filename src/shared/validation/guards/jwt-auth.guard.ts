import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { request } from "http";
import * as jwt from 'jsonwebtoken';
import { Observable } from "rxjs";
import { Request } from "express";

@Injectable()
export class JwtAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    
    return this.validateRequest(request.cookies.jwt, request)
  }

  async validateRequest(cookies, req: Request) {
    const validToken = jwt.verify(cookies, 'asdf')
    
    req.cookies.userInfo = validToken;
    return !!validToken;
  }
}