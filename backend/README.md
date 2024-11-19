# My .NET API

This is a simple REST API built with .NET that demonstrates handling GET and POST requests.

## Project Structure

- **Controllers**
  - `ExampleController.cs`: Handles HTTP requests and interacts with the service layer.
  
- **Models**
  - `ExampleModel.cs`: Defines the data structure for the API.
  
- **Services**
  - `ExampleService.cs`: Contains business logic for retrieving and saving data.
  
- **Program.cs**: Entry point of the application.
  
- **Startup.cs**: Configures services and middleware for the application.
  
- **my-dotnet-api.csproj**: Project file containing dependencies and build settings.

## Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd my-dotnet-api
   ```

3. Restore the dependencies:
   ```
   dotnet restore
   ```

4. Run the application:
   ```
   dotnet run
   ```

## Usage Examples

### GET Request

To retrieve an example model, send a GET request to:
```
GET /api/example
```

### POST Request

To create a new example model, send a POST request to:
```
POST /api/example
```
With the following JSON body:
```json
{
  "property1": "value1",
  "property2": "value2"
}
```

## License

This project is licensed under the MIT License.