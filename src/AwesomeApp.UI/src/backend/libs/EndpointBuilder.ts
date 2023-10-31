import { HttpMethod } from "@/shared/HttpMethod";
import { NextApiRequest, NextApiResponse } from "next";

type EndpointCallback<T> = (req: NextApiRequest, res: NextApiResponse<T>) => Promise<void>

class EndpointBuilder {
  private methodCallbackDictionary: { [method: string]: (req: NextApiRequest, res: NextApiResponse<any>) => Promise<void> } = {}
  
  private addCallback<T>(method: HttpMethod, callback: EndpointCallback<T>): EndpointBuilder {
    this.methodCallbackDictionary[method] = callback

    return this
  }

  get<T>(callback: EndpointCallback<T>): EndpointBuilder {
    return this.addCallback(HttpMethod.get, callback)
  }

  post<T>(callback: EndpointCallback<T>): EndpointBuilder {
    return this.addCallback(HttpMethod.post, callback)
  }

  put<T>(callback: EndpointCallback<T>): EndpointBuilder {
    return this.addCallback(HttpMethod.put, callback)
  }

  patch<T>(callback: EndpointCallback<T>): EndpointBuilder {
    return this.addCallback(HttpMethod.patch, callback)
  }

  delete<T>(callback: EndpointCallback<T>): EndpointBuilder {
    return this.addCallback(HttpMethod.delete, callback)
  }

  build(): (req: NextApiRequest, res: NextApiResponse<any>) => Promise<void> {
    return async (req: NextApiRequest, res: NextApiResponse<any>) => {
      try {
        if (this.methodCallbackDictionary[req.method ?? '']) {
          await this.methodCallbackDictionary[req.method!](req, res)
        } else {
          res.status(404).send('Not found')
        }
      }
      catch (e) {
        res.status(500).send(`Internal server error - ${e}`)
      }
    }
  }
}

export function createEndpointBuilder(): EndpointBuilder {
  return new EndpointBuilder()
}