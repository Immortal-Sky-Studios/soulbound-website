// Strongly types process.env manually, does not validate variable's existance
namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
    }
}