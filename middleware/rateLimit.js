import rateLimit from 'express-rate-limit';


export const AuthLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minute
    max: 5, // limit each IP to 5 requests per windowMs
    message: { message: 'Too many login attempts from this IP, please try again after a minute' },
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

