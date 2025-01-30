export interface CreateRequest {
  problem: {
    title: string;
    content?: string;
  };
}

export interface CreateResponse {
  id: string;
  solutions: string[];
  events?: {
    problem: string;
    solutions: string[];
  }[];
}

export interface TimestampedEvent {
  id: string;
  title: string;
  description?: string;
  timestamp: string;
  solutions: string[];
  events?: {
    problem: string;
    solutions: string[];
  }[];
}

export interface ProcessRequest {
  solution: string;
}

export interface ProcessResponse {
  success: boolean;
  process: string[];
}

export interface Item extends TimestampedEvent {
  date: string;
}

export interface ValidationError {
  code: "VALIDATION_ERROR";
  message: string;
  details: string[];
}

export interface InternalServerError {
  code: "INTERNAL_SERVER_ERROR";
  message: string;
}
