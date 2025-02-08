import "@typespec/http";
import "@typespec/rest";
import "@typespec/openapi3";

using TypeSpec.Http;
using TypeSpec.Rest;

@service({
    title: "momen.ai API",
})
@server(
    "http://localhost:{port}",
    "Dev Endpoint",
    {
        port: string = "4010",
    }
)
namespace momenAIAPI;

@route("/api")
interface API {
    @route("/create")
    @post
    create(
        @body
        body: Request,
    ): {
        @statusCode statusCode:200,
        @body body:Response;
    } | {
        @statusCode statusCode:400,
        @body error: ValidationError;
    } | {
        @statusCode statusCode:500,
        @body error: InternalServerError;
    }
}

model Request {
    problem: {
        title: string;
        content?: string;
    }
}

model Response {
    solutions: string[];
    events?: {
        problem: string;
        solutions: string[];
    }[];
}

@error
model ValidationError {
  code: "VALIDATION_ERROR";
  message: string;
  details: string[];
}

@error
model InternalServerError {
  code: "INTERNAL_SERVER_ERROR";
  message: string;
}
