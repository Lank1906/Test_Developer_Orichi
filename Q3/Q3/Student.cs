namespace Q3
{
    public class Student
    {
        public string Name { get; set; }
        public Dictionary<string, int> Score { get; set; }

        public Student(string name, int math, int physics, int chemistry)
        {
            Name = name;
            Score = new Dictionary<string, int>
        {
            { "math", math },
            { "physics", physics },
            { "chemistry", chemistry }
        };
        }

        public double GetAverageScore()
        {
            return (Score["math"] + Score["physics"] + Score["chemistry"]) / 3.0;
        }
    }
}
