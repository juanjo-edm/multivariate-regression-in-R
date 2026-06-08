install.packages("rsconnect")

library(rsconnect)

rsconnect::writeManifest(
  appDir = ".",
  appPrimaryDoc = "Model Notebook Documentation.Rmd",
  appMode = "rmd-static"
)
