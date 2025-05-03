<!DOCTYPE html>
<html>
<head>
    <title>ToDo App</title>
    <meta charset="utf-8">
</head>
<body>
    <h1>Görev Ekle</h1>

    @if ($errors->any())
        <div style="color: red;">
            <ul>
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif

    <form action="{{ route('tasks.store') }}" method="POST">
        @csrf
        <input type="text" name="title" placeholder="Görev başlığı girin" required>
        <button type="submit">Ekle</button>
    </form>

    <h2>Görev Listesi</h2>
    <ul>
        @foreach ($tasks as $task)
            <li>{{ $task->title }}</li>
        @endforeach
    </ul>
</body>
</html>
