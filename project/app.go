package main

import (
	"context"
	"os"

	"github.com/wailsapp/wails/v2/pkg/runtime"
)

// App struct
type App struct {
	ctx context.Context
}

type PickedFile struct {
	Path    string `json:"path"`
	Content string `json:"content"`
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

// PickFile opens a native file picker and returns selected path + content.
func (a *App) PickFile() (PickedFile, error) {
	selectedPath, err := runtime.OpenFileDialog(a.ctx, runtime.OpenDialogOptions{
		Title: "Select a file",
	})
	if err != nil {
		return PickedFile{}, err
	}

	if selectedPath == "" {
		return PickedFile{}, nil
	}

	content, err := os.ReadFile(selectedPath)
	if err != nil {
		return PickedFile{}, err
	}

	return PickedFile{
		Path:    selectedPath,
		Content: string(content),
	}, nil
}

// SaveFile writes content to the provided path.
func (a *App) SaveFile(path string, content string) error {
	if path == "" {
		return nil
	}

	return os.WriteFile(path, []byte(content), 0644)
}

// SaveFileAs opens a native save dialog, writes content, and returns the saved path.
func (a *App) SaveFileAs(content string) (string, error) {
	savePath, err := runtime.SaveFileDialog(a.ctx, runtime.SaveDialogOptions{
		Title: "Save file as",
	})
	if err != nil {
		return "", err
	}

	if savePath == "" {
		return "", nil
	}

	if err := os.WriteFile(savePath, []byte(content), 0644); err != nil {
		return "", err
	}

	return savePath, nil
}
