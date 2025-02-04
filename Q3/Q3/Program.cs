using Q3;

Console.OutputEncoding = System.Text.Encoding.UTF8;
//A
List<Student> students = new List<Student>
{
    new Student("Nguyen Van A", 10, 9, 8),
    new Student("Tran Thi B", 7, 8, 9),
    new Student("Le Van C", 8, 8, 8),
    new Student("Pham Thi D", 9, 10, 10),
    new Student("Bui Van E", 8, 8, 8),
    new Student("Do Thi F", 6, 7, 8),
    new Student("Hoang Van G", 9, 9, 9)
};


//B
static void BubbleSort(List<Student> students)
{
    int n = students.Count;
    for (int i = 0; i < n - 1; i++)
    {
        for (int j = 0; j < n - i - 1; j++)
        {
            double avg1 = students[j].GetAverageScore();
            double avg2 = students[j + 1].GetAverageScore();

            // So sánh điểm trung bình
            if (avg1 < avg2 || (avg1 == avg2 && string.Compare(students[j].Name, students[j + 1].Name) > 0))
            {
                // Hoán đổi vị trí
                var temp = students[j];
                students[j] = students[j + 1];
                students[j + 1] = temp;
            }
        }
    }
}
BubbleSort(students);
Console.WriteLine("Danh sách sau khi sắp xếp:");
foreach (var student in students)
{
    Console.WriteLine($"{student.Name}, Điểm TB: {student.GetAverageScore():F2}");
}

//C
static Student BinarySearch(List<Student> students, double target)
{
    int left = 0, right = students.Count - 1;
    while (left <= right)
    {
        int mid = left + (right - left) / 2;
        double avg = students[mid].GetAverageScore();

        if (avg == target)
            return students[mid];
        else if (avg < target)
            right = mid - 1;
        else
            left = mid + 1;
    }
    return null;
}
Student foundStudent = BinarySearch(students, 8.0);
if (foundStudent != null)
{
    Console.WriteLine($"\nHọc sinh có điểm TB = 8: {foundStudent.Name}");
}
else
{
    Console.WriteLine("\nKhông tìm thấy học sinh có điểm TB = 8.");
}
