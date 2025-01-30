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
namespace momenAIAPI {

    @route("/api")
    interface API {
        @route("/create")
        @post
        create(
            @body
            body: CreateRequest,
        ): {
            @statusCode statusCode:200,
            @body body: CreateResponse;
        } | {
            @statusCode statusCode:400,
            @body error: ValidationError;
        } | {
            @statusCode statusCode:500,
            @body error: InternalServerError;
        };

        @route("/timestamp")
        @post
        timestamp(
            @body
            body: PartialRequest,
        ): {
            @statusCode statusCode:200,
            @body body: TimestampResponse;
        } | {
            @statusCode statusCode:500,
            @body error: InternalServerError;
        };

        @route("/process")
        @post
        process(
            @body
            body: ProcessRequest,
        ): {
            @statusCode statusCode:200,
            @body body: ProcessResponse;
        } | {
            @statusCode statusCode:500,
            @body error: InternalServerError;
        };
    }

}

model PartialRequest {
    title: string;
    description?: string;
    // 他の必要なフィールド
}

model TimestampResponse {
    success: boolean;
    data: TimestampedEvent;
}

model TimestampedEvent {
    title: string;
    description?: string;
    timestamp: string;
    solutions: string[];
    events?: {
        problem: string;
        solutions: string[];
    }[];
}

model ProcessRequest {
    solution: string;
}

model ProcessResponse {
    success: boolean;
    process: string[];
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
