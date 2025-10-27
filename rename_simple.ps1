[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$ErrorActionPreference = "Continue"

Set-Location examples

# Esper Club
Get-ChildItem -Filter "Esper_Club_*.jpg" | ForEach-Object {
    if ($_.Name -match 'апртаменты') {
        $newName = $_.Name -replace 'апртаменты', 'apartamenti'
        Rename-Item -Path $_.FullName -NewName $newName
        Write-Host "Renamed: $($_.Name) -> $newName"
    }
}

# Барселона
Get-ChildItem -Filter "*Барселона*.jpg" | ForEach-Object {
    $newName = $_.Name -replace 'Апартаменты_Барселона', 'Apartamenti_Barselona'
    Rename-Item -Path $_.FullName -NewName $newName
    Write-Host "Renamed: $($_.Name) -> $newName"
}

# Валенсия
Get-ChildItem -Filter "*Валенсия*.jpg" | ForEach-Object {
    if ($_.Name -match 'Апартаменты_Валенсия') {
        $newName = $_.Name -replace 'Апартаменты_Валенсия', 'Apartamenti_Valensiya'
        Rename-Item -Path $_.FullName -NewName $newName
        Write-Host "Renamed: $($_.Name) -> $newName"
    }
    if ($_.Name -match 'Валенсия_Игорь') {
        $newName = $_.Name -replace 'Валенсия_Игорь', 'Valensiya_Igor'
        Rename-Item -Path $_.FullName -NewName $newName
        Write-Host "Renamed: $($_.Name) -> $newName"
    }
}

# Васильевский
Get-ChildItem -Filter "*Васильевский*.jpg" | ForEach-Object {
    $newName = $_.Name -replace 'Артаменты_Васильевский_остров', 'Apartamenti_Vasilevskiy_ostrov'
    Rename-Item -Path $_.FullName -NewName $newName
    Write-Host "Renamed: $($_.Name) -> $newName"
}

# Домино
Get-ChildItem -Filter "*Домино*.jpg" | ForEach-Object {
    $newName = $_.Name -replace 'ЖК_Домино', 'JK_Domino'
    Rename-Item -Path $_.FullName -NewName $newName
    Write-Host "Renamed: $($_.Name) -> $newName"
}

# Кировский
Get-ChildItem -Filter "*Кировский*.jpg" | ForEach-Object {
    $newName = $_.Name -replace 'Кировский_завод', 'Kirovskiy_zavod'
    Rename-Item -Path $_.FullName -NewName $newName
    Write-Host "Renamed: $($_.Name) -> $newName"
}

# Ильичево
Get-ChildItem -Filter "*Ильичево*.jpg" | ForEach-Object {
    if ($_.Name -match 'Коттедж_Ильичево') {
        $newName = $_.Name -replace 'Коттедж_Ильичево', 'Kottedzh_Ilichevo'
        Rename-Item -Path $_.FullName -NewName $newName
        Write-Host "Renamed: $($_.Name) -> $newName"
    }
    if ($_.Name -match 'Частный_комплекс_3_дома_Ильичево') {
        $newName = $_.Name -replace 'Частный_комплекс_3_дома_Ильичево', 'Chastnyy_kompleks_3_doma_Ilichevo'
        Rename-Item -Path $_.FullName -NewName $newName
        Write-Host "Renamed: $($_.Name) -> $newName"
    }
}

# Частный комплекс 3000м2
Get-ChildItem -Filter "*3000м2*.jpg" | ForEach-Object {
    $newName = $_.Name -replace 'Частный_комплекс_3000м2', 'Chastnyy_kompleks_3000m2'
    Rename-Item -Path $_.FullName -NewName $newName
    Write-Host "Renamed: $($_.Name) -> $newName"
}

# Элинг
Get-ChildItem -Filter "*Элинг*.jpg" | ForEach-Object {
    $newName = $_.Name -replace 'Элинг', 'Eling'
    Rename-Item -Path $_.FullName -NewName $newName
    Write-Host "Renamed: $($_.Name) -> $newName"
}

Write-Host "`nГотово!"


