import { Request, Response, NextFunction } from "express";

// bạn có thể mở rộng interface Request để có thêm userId
declare module "express-serve-static-core" {
  interface Request {
    userId?: number;
    username?: string;
    role?: string;
  }
}

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const userSession = req.session.user;

  if (!userSession) {
    return res.status(401).json({ error: "Chưa đăng nhập" });
  }

  req.userId = userSession.id;
  req.username = userSession.username;
  req.role = userSession.role;

  next();
}

// middleware check login
export function setUserLocals(req: Request, res: Response, next: NextFunction) {
  res.locals.user = req.session.user || null;
  next();
}



export function authorizeRoles(...allowedRoles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.role) {
      return res.status(403).json({ error: "Không có quyền truy cập" });
    }

    if (!allowedRoles.includes(req.role)) {
      return res.status(403).json({ error: "Không có quyền truy cập" });
    }

    next();
  };
}