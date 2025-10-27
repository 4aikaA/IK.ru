# Скрипт для переименования файлов с кириллицей в латиницу
Set-Location "examples"

# Esper Club апртаменты
Get-ChildItem -Filter "Esper_Club_апртаменты_*.jpg" | ForEach-Object {
    $newName = $_.Name -replace 'апртаменты', 'apartamenti'
    Rename-Item $_.FullName -NewName $newName
    Write-Host "Renamed: $($_.Name) -> $newName"
}

# Апартаменты Барселона
Get-ChildItem -Filter "Апартаменты_Барселона_*.jpg" | ForEach-Object {
    $newName = $_.Name -replace 'Апартаменты_Барселона', 'Apartamenti_Barselona'
    Rename-Item $_.FullName -NewName $newName
    Write-Host "Renamed: $($_.Name) -> $newName"
}

# Апартаменты Валенсия
Get-ChildItem -Filter "Апартаменты_Валенсия_*.jpg" | ForEach-Object {
    $newName = $_.Name -replace 'Апартаменты_Валенсия', 'Apartamenti_Valensiya'
    Rename-Item $_.FullName -NewName $newName
    Write-Host "Renamed: $($_.Name) -> $newName"
}

# Артаменты Васильевский остров
Get-ChildItem -Filter "Артаменты_Васильевский_остров_*.jpg" | ForEach-Object {
    $newName = $_.Name -replace 'Артаменты_Васильевский_остров', 'Apartamenti_Vasilevskiy_ostrov'
    Rename-Item $_.FullName -NewName $newName
    Write-Host "Renamed: $($_.Name) -> $newName"
}

# Валенсия Игорь
Get-ChildItem -Filter "Валенсия_Игорь_*.jpg" | ForEach-Object {
    $newName = $_.Name -replace 'Валенсия_Игорь', 'Valensiya_Igor'
    Rename-Item $_.FullName -NewName $newName
    Write-Host "Renamed: $($_.Name) -> $newName"
}

# ЖК Домино
Get-ChildItem -Filter "ЖК_Домино.jpg" | ForEach-Object {
    $newName = $_.Name -replace 'ЖК_Домино', 'JK_Domino'
    Rename-Item $_.FullName -NewName $newName
    Write-Host "Renamed: $($_.Name) -> $newName"
}

# Кировский завод
Get-ChildItem -Filter "Кировский_завод_*.jpg" | ForEach-Object {
    $newName = $_.Name -replace 'Кировский_завод', 'Kirovskiy_zavod'
    Rename-Item $_.FullName -NewName $newName
    Write-Host "Renamed: $($_.Name) -> $newName"
}

# Коттедж Ильичево
Get-ChildItem -Filter "Коттедж_Ильичево_*.jpg" | ForEach-Object {
    $newName = $_.Name -replace 'Коттедж_Ильичево', 'Kottedzh_Ilichevo'
    Rename-Item $_.FullName -NewName $newName
    Write-Host "Renamed: $($_.Name) -> $newName"
}

# Частный комплекс 3 дома Ильичево
Get-ChildItem -Filter "Частный_комплекс_3_дома_Ильичево_*.jpg" | ForEach-Object {
    $newName = $_.Name -replace 'Частный_комплекс_3_дома_Ильичево', 'Chastnyy_kompleks_3_doma_Ilichevo'
    Rename-Item $_.FullName -NewName $newName
    Write-Host "Renamed: $($_.Name) -> $newName"
}

# Частный комплекс 3000м2
Get-ChildItem -Filter "Частный_комплекс_3000м2_*.jpg" | ForEach-Object {
    $newName = $_.Name -replace 'Частный_комплекс_3000м2', 'Chastnyy_kompleks_3000m2'
    Rename-Item $_.FullName -NewName $newName
    Write-Host "Renamed: $($_.Name) -> $newName"
}

# Элинг
Get-ChildItem -Filter "Элинг_*.jpg" | ForEach-Object {
    $newName = $_.Name -replace 'Элинг', 'Eling'
    Rename-Item $_.FullName -NewName $newName
    Write-Host "Renamed: $($_.Name) -> $newName"
}

Write-Host "`nГотово! Все файлы переименованы."

