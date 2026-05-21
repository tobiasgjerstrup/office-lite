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
