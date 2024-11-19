using AutoSummarize.Models;

namespace AutoSummarize.Services
{
  public class ExampleService
  {
    private readonly List<ExampleModel> exampleList = new List<ExampleModel>()
    {
      new ExampleModel
      {
        Id = 1,
        Name = "Example 1",
        Description = "This is the first example.",
      },
      new ExampleModel
      {
        Id = 2,
        Name = "Example 2",
        Description = "This is the second example.",
      },
    };

    public List<ExampleModel> GetAllExamples()
    {
      return exampleList;
    }

    public void AddExample(ExampleModel example)
    {
      exampleList.Add(example);
    }

    public ExampleModel GetExample(int id)
    {
      var example = exampleList.FirstOrDefault(e => e.Id == id);
      if (example == null)
      {
        throw new KeyNotFoundException($"Example with ID {id} not found.");
      }
      return example;
    }

    public ExampleModel SaveExample(ExampleModel exampleModel)
    {
      var existingExample = exampleList.FirstOrDefault(e => e.Id == exampleModel.Id);
      if (existingExample != null)
      {
        exampleList.Remove(existingExample);
      }
      exampleList.Add(exampleModel);
      return exampleModel;
    }
  }
}
